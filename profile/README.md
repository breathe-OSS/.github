# Breathe Open Source Software

> _"Breathe, breathe in the air. Don't be afraid to care."_ - **Pink Floyd**, _The Dark Side of the Moon_

**Breathe** is an open-source initiative dedicated to providing transparent, highly accurate, and real-time Air Quality Index (AQI) monitoring for the Jammu & Kashmir region. 

Due to sparse sensor networks and unreliable public data, AQI metrics varying wildly between platforms. Breathe aims to solve this by building a strictly curated, ground-truth network using localized physical sensors and validated satellite tracking.

---

## Our Platforms

This organization contains all the repositories required to build and maintain the **Breathe** infrastructure.

* **[Breathe (Android)](https://github.com/breathe-OSS/breathe)** (`breathe`)  
  A modern, MD3 Android application built with Kotlin and Jetpack Compose.
* **[Breathe (iOS)](https://github.com/breathe-OSS/breathe-ios)** (`breathe-ios`)  
  A sleek, native iOS application built with Swift and SwiftUI.
* **[Breathe Webapp](https://github.com/breathe-OSS/site)** (`site`)  
  The official portfolio and webapp (CSS/TS/HTML).
* **[Breathe API](https://github.com/breathe-OSS/api)** (`api`)  
  Our Python/FastAPI backend calculating real-time NAQI and US AQI based on curated data.

## Data Providers

Breathe uses a hybrid approach to guarantee accuracy:

1. **AirGradient**: We deploy physical, ground-level AirGradient sensors in key regions (currently Jammu, Srinagar, and Rajouri) for highly precise PM10 and PM2.5 readings.
2. **Open-Meteo**: For regions lacking physical sensors, we utilize Open-Meteo’s stable, satellite-based air quality models.

### Call for Hardware Contributors
We are actively working to deploy custom physical sensors to improve data density. If you are interested in hosting a sensor node in J&K, please contact us at: **[contact@breatheoss.app](mailto:contact@breatheoss.app)**

## Core Team & Developers

This organization is maintained by [sidharthify](https://github.com/sidharthify). This project is proudly built and maintained as Free & Open Source Software (FOSS).

- **sidharthify** - Lead Dev
- **Flashwreck** - Lead dev & devops maintainer
- **SleeperOfSaturn** - iOS app co-lead
- **Lostless1907** - Contributor & developer
- **suveshmoza** - Contributor & developer
- **empirea9** - Contributor

We are welcoming pull requests and issues across all our repositories! Feel free to contribute, but do check [this](https://sidharthify.tech/blogs/blog-10-2-26/#section-24)
