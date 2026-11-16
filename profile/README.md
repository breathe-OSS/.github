<p align="center">
  <img src="https://raw.githubusercontent.com/breathe-OSS/.github/main/profile/assets/banner.png" alt="Breathe" width="100%">
</p>

# Breathe Open Source Software

> _"Breathe, breathe in the air. Don't be afraid to care."_ - **Pink Floyd**, _The Dark Side of the Moon_

**Breathe** is a free and open-source air quality network for **Jammu & Kashmir and Ladakh**. We put real ground sensors in towns across the region and show you, in real time, how clean the air you're breathing actually is.

Due to sparse sensor networks and unreliable public data, AQI numbers for J&K vary wildly between platforms. There are only 3 government ground stations in all of J&K, and official figures come out as monthly averages. Breathe aims to solve this by building a strictly curated, ground-truth network using localized physical sensors and validated satellite tracking. The code, the methodology and the data are all open.

Breathe is an independent, non-profit, community project. We are not affiliated with the CPCB, JKPCB or any government agency.

[Web app](https://breatheoss.app) · [About](https://about.breatheoss.app) · [Blog](https://blogs.breatheoss.app) · [API docs](https://docs.breatheoss.app) · [Discord](https://discord.breatheoss.app)

---

## Just want to check the air?

You don't need to touch any code. Pick your town and you get the live AQI, the main pollutant and history, in both the US EPA and Indian NAQI standards.

* **Web:** [breatheoss.app](https://breatheoss.app)
* **Android:** [Google Play](https://play.google.com/store/apps/details?id=com.sidharthify.breathe) or the APK from [GitHub releases](https://github.com/breathe-OSS/breathe/releases)
* **iOS, iPadOS & macOS:** [App Store](https://apps.apple.com/us/app/breathe-aqi-for-jk-ladakh/id6761560112)

## Our Platforms

This organization contains all the repositories required to build and maintain the **Breathe** infrastructure.

* **[Breathe (Android)](https://github.com/breathe-OSS/breathe)** (`breathe`)  
  A modern, MD3 Android application built with Kotlin and Jetpack Compose.
* **[Breathe (iOS)](https://github.com/breathe-OSS/breathe-ios)** (`breathe-ios`)  
  A sleek, native iOS application built with Swift and SwiftUI.
* **[Breathe Webapp](https://github.com/breathe-OSS/site)** (`site`)  
  The official webapp at [breatheoss.app](https://breatheoss.app) (CSS/TS/HTML).
* **[Breathe API](https://github.com/breathe-OSS/api)** (`api`)  
  Our Python/FastAPI backend calculating real-time NAQI and US AQI based on curated data. It's public and needs no key, see [docs.breatheoss.app](https://docs.breatheoss.app).
* **[About](https://github.com/breathe-OSS/about)** (`about`)  
  Our mission, methodology and team at [about.breatheoss.app](https://about.breatheoss.app).
* **[Breathe Blog](https://github.com/breathe-OSS/blogs)** (`blogs`)  
  The BreatheOSS blog at [blogs.breatheoss.app](https://blogs.breatheoss.app), with posts built on our own sensor data.
* **[API Docs](https://github.com/breathe-OSS/docs)** (`docs`)  
  The API reference at [docs.breatheoss.app](https://docs.breatheoss.app).

## Data Providers

Breathe uses a hybrid approach to guarantee accuracy:

1. **AirGradient**: We deploy physical, ground-level AirGradient sensors for highly precise PM10 and PM2.5 readings. As of 13/11/26 that's 20 sensors across 13 districts, from Jammu and Kathua up to Srinagar, Kargil and Leh. The live list is always at [api.breatheoss.app/sensor-info](https://api.breatheoss.app/sensor-info).
2. **Open-Meteo**: For regions lacking physical sensors, and for the other pollutants (NO2, SO2, CO, O3), we utilize Open-Meteo’s stable, satellite-based air quality models. If a sensor goes offline or reports something unrealistic, that zone falls back to Open-Meteo automatically.

The AQI is the highest pollutant sub-index, not an average, and every reading comes as both a live value (for spikes) and a 24-hour average (for official reporting). The full method is on [about.breatheoss.app](https://about.breatheoss.app).

### Call for Hardware Contributors
We are actively working to deploy custom physical sensors to improve data density. If you are interested in hosting a sensor node in J&K or Ladakh, please contact us at: **[contact@breatheoss.app](mailto:contact@breatheoss.app)**

## Core Team & Developers

This organization is maintained by [sidharthify](https://github.com/sidharthify). This project is proudly built and maintained as Free & Open Source Software (FOSS).

<!-- contributors:start -->
### Core Team

- **[sidharthify](https://github.com/sidharthify)** - Lead Developer
- **[FlashWreck](https://github.com/FlashWreck)** - Lead Developer, DevOps
- **[Lostless1907](https://github.com/Lostless1907)** - Developer
- **[SleeperOfSaturn](https://github.com/SleeperOfSaturn)** - Developer, iOS App Co-dev
- **[Altair Irfan](https://www.linkedin.com/in/altairirfan/)**

_Plus one member whose name is withheld for privacy._

### Contributors

- **[suveshmoza](https://github.com/suveshmoza)** - Developer
- **[empirea9](https://github.com/empirea9)**
- **[sandeepxi](https://github.com/sandeepxi)**
- **[oldschoolfellow](https://github.com/oldschoolfellow)**
- **[Rudhransh Damral](https://www.instagram.com/the_rudhransh/)**
- **[Historeel](https://www.instagram.com/historeel/)**

Everyone else who helped, including partner organisations, is on [about.breatheoss.app](https://about.breatheoss.app/#people).
<!-- contributors:end -->

We are welcoming pull requests and issues across all our repositories! Feel free to contribute, but do check [this](https://sidharthify.tech/blogs/blog-10-2-26/#want-to-contribute)
