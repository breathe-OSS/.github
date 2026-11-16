#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const { people } = JSON.parse(readFileSync(join(here, '..', 'contributors.json'), 'utf8'));
const root = resolve(process.argv[2] ?? join(here, '..', '..'));
const check = process.argv.includes('--check');

const ABOUT_PEOPLE = 'https://about.breatheoss.app/#people';

const linkOf = (p) => {
  if (p.github) {
    return `https://github.com/${p.github}`;
  }
  return p.url;
};

const escHtml = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const escStr = (s) => s.replaceAll('\\', '\\\\').replaceAll('"', '\\"');

const core = people.filter((p) => p.tier === 'core');
const contributors = people.filter((p) => p.tier === 'contributor');
const founders = people.filter((p) => p.founder);
const publicCore = core.filter((p) => !p.private);

const forPlatform = (area) => [
  ...publicCore,
  ...contributors.filter((p) => !p.org && p.areas.includes(area)),
];

const indentLines = (lines, indent) => lines.map((l) => (l === '' ? '' : indent + l)).join('\n');

function replaceBetween(text, start, end, render, file) {
  const s = text.indexOf(start);
  const e = text.indexOf(end);
  if (s === -1 || e === -1 || e < s) {
    throw new Error(`${file}: missing ${start} / ${end} markers`);
  }
  const lineStart = text.lastIndexOf('\n', s) + 1;
  const indent = text.slice(lineStart, s);
  const bodyStart = s + start.length;
  const endLineStart = text.lastIndexOf('\n', e) + 1;
  return text.slice(0, bodyStart) + '\n' + indentLines(render(), indent) + '\n' + text.slice(endLineStart);
}

function personCard(p) {
  if (p.private) {
    const label = `${p.display} (Name Redacted for Privacy)`;
    return [
      '<div class="person">',
      `  <div class="member-circle redacted" role="button" tabindex="0" aria-label="${escHtml(label)}">`,
      '    <div class="redacted-icon">X</div>',
      `    <div class="member-tooltip" role="tooltip">${escHtml(label)}</div>`,
      '  </div>',
      `  <span class="person-name">${escHtml(p.display)}</span>`,
      '</div>',
    ];
  }
  return [
    `<a class="person" href="${escHtml(linkOf(p))}" target="_blank" rel="noopener">`,
    `  <span class="member-circle"><img src="assets/people/${p.avatar}" alt="" loading="lazy" width="64" height="64"></span>`,
    `  <span class="person-name">${escHtml(p.display)}</span>`,
    '</a>',
  ];
}

function peopleGroup(cls, label, list, tail = []) {
  return [
    `<div class="card people-group ${cls}">`,
    `  <h3 class="people-label">${label}</h3>`,
    '  <div class="people-grid">',
    ...list.flatMap(personCard).map((l) => '    ' + l),
    ...tail.map((l) => '    ' + l),
    '  </div>',
    '</div>',
  ];
}

const anonymous = [
  '<div class="person">',
  '  <div class="member-circle anonymous-contributor" id="anonymous-contributor" role="button" tabindex="0" aria-label="And the countless other anonymous contributors">',
  '    <svg viewBox="0 0 24 24" class="unknown-avatar-icon" width="26" height="26" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>',
  '    <div class="anonymous-tooltip" role="tooltip">And the countless other anonymous contributors</div>',
  '  </div>',
  '  <span class="person-name">And many more</span>',
  '</div>',
];

function siteItem(title, subtitle, url) {
  return [
    '<div',
    '  class="settings-item clickable"',
    `  onclick="window.open('${url}', '_blank')">`,
    '  <div>',
    `    <div class="settings-title">${escHtml(title)}</div>`,
    `    <div class="settings-subtitle">${escHtml(subtitle)}</div>`,
    '  </div>',
    '</div>',
  ];
}

const handleOrRole = (p) => {
  if (p.github) {
    return `@${p.github}`;
  }
  return p.role;
};


const withLink = (p) => {
  const links = [linkOf(p), p.website].filter(Boolean);
  if (links.length === 0) {
    return p.display;
  }
  return `${p.display} (${links.join(', ')})`;
};

const targets = [
  {
    file: 'github/profile/README.md',
    apply: (t, f) =>
      replaceBetween(t, '<!-- contributors:start -->', '<!-- contributors:end -->', () =>
        people
          .filter((p) => !p.private && !p.org)
          .map((p) => {
            const name = p.github ? `[${p.github}](${linkOf(p)})` : `[${p.name}](${linkOf(p)})`;
            return `- **${name}** - ${p.role}`;
          })
          .concat(['', `Everyone else who helped, including partner organisations, is on [about.breatheoss.app](${ABOUT_PEOPLE}).`]), f),
  },
  {
    file: 'about/index.html',
    apply: (t, f) =>
      replaceBetween(t, '<!-- contributors:start -->', '<!-- contributors:end -->', () => [
        ...peopleGroup('people-founders', 'Founders', founders),
        ...peopleGroup('people-team', 'Team', core),
        ...peopleGroup('people-contributors', 'Contributors', contributors, anonymous),
      ], f),
  },
  {
    file: 'about/llms.txt',
    apply: (t, f) => {
      const head = '## Team\n\n';
      const s = t.indexOf(head);
      const e = t.indexOf('\n## ', s + head.length);
      if (s === -1 || e === -1) {
        throw new Error(`${f}: missing ## Team section`);
      }
      const privateCount = core.filter((p) => p.private).length;
      const coreNames = publicCore.map((p) => (p.github ? `${p.display} (${linkOf(p)})` : p.display));
      if (privateCount > 0) {
        coreNames.push(privateCount === 1 ? 'one member whose name is withheld for privacy' : `${privateCount} members whose names are withheld for privacy`);
      }
      const joinAnd = (xs) => xs.slice(0, -1).join(', ') + ', and ' + xs.at(-1);
      const lines = [
        `- Founders: ${founders.map(withLink).join(' and ')}`,
        `- Core team: ${joinAnd(coreNames)}`,
        `- Contributors: ${joinAnd([...contributors.filter((p) => !p.org).map((p) => p.github ?? p.display), 'many anonymous contributors'])}`,
        `- Organisations credited as contributors: ${contributors.filter((p) => p.org).map((p) => p.longName ?? p.display).join(', ')}`,
        `- Full list with links: ${ABOUT_PEOPLE}`,
        '',
      ];
      return t.slice(0, s + head.length) + lines.join('\n') + t.slice(e);
    },
  },
  {
    file: 'site/index.html',
    apply: (t, f) =>
      replaceBetween(t, '<!-- contributors:start -->', '<!-- contributors:end -->', () => {
        const list = forPlatform('web');
        const devs = list.filter((p) => p.tier === 'core');
        const others = list.filter((p) => p.tier !== 'core');
        return [
          '<div class="settings-section-title">Developers</div>',
          '<div class="settings-card">',
          ...devs.flatMap((p) => siteItem(p.name, handleOrRole(p), linkOf(p))).map((l) => '  ' + l),
          '</div>',
          '',
          '<div class="settings-section-title">Contributors</div>',
          '<div class="settings-card">',
          ...others.flatMap((p) => siteItem(p.name, handleOrRole(p), linkOf(p))).map((l) => '  ' + l),
          ...siteItem('All Contributors', 'Everyone who has helped build Breathe', ABOUT_PEOPLE).map((l) => '  ' + l),
          '</div>',
        ];
      }, f),
  },
  {
    file: 'breathe/app/src/main/java/com/sidharthify/breathe/ui/screens/SettingsScreen.kt',
    apply: (t, f) =>
      replaceBetween(t, '// contributors:start', '// contributors:end', () =>
        forPlatform('android').map((p) => {
          const handle = p.github ? `"${escStr(p.github)}"` : 'null';
          return `TeamMember("${escStr(p.name)}", "${escStr(p.role)}", ${handle}, "${linkOf(p)}"),`;
        }), f),
  },
  {
    file: 'ios/Breathe/Views/SettingsView.swift',
    apply: (t, f) =>
      replaceBetween(t, '// contributors:start', '// contributors:end', () =>
        forPlatform('ios').map((p) => {
          const handle = p.github ? `"${escStr(p.github)}"` : 'nil';
          return `PersonRow(name: "${escStr(p.name)}", handle: ${handle}, role: "${escStr(p.role)}", url: "${linkOf(p)}")`;
        }), f),
  },
];

let stale = 0;
for (const { file, apply } of targets) {
  const path = join(root, file);
  if (!existsSync(path)) {
    console.log(`skip    ${file} (not checked out)`);
    continue;
  }
  const before = readFileSync(path, 'utf8');
  const after = apply(before, file);
  if (before === after) {
    console.log(`ok      ${file}`);
    continue;
  }
  stale++;
  if (check) {
    console.log(`stale   ${file}`);
  } else {
    writeFileSync(path, after);
    console.log(`updated ${file}`);
  }
}

if (check && stale > 0) {
  process.exit(1);
}
