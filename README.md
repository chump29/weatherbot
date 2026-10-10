# ![WeatherBot](./utils/images/weatherbot.webp) WeatherBot

> - WeatherBot for Discord

---

![Bun](https://img.shields.io/badge/Bun-1.4.2-informational?style=plastic&logo=bun "Bun") &nbsp;
![discord.js](https://img.shields.io/badge/discord.js-^14.27.0-informational?style=plastic&logo=discord.js "discord.js")

![CodeQL](https://github.com/chump29/weatherbot/workflows/CodeQL/badge.svg "CodeQL") &nbsp;
![Coverage](https://img.shields.io/badge/Coverage-81.33%25-success?style=plastic&logo=jest "Coverage")

![NO AI](https://img.shields.io/badge/NO-AI-orange?style=plastic "NO AI") &nbsp;
![License](https://img.shields.io/github/license/chump29/weatherbot?style=plastic&color=blueviolet&label=License&logo=gplv3 "GPLv3") &nbsp; <!-- markdownlint-disable MD013 -->
![CVE Scan](https://img.shields.io/badge/CVE%20Scan-Pass-success?style=plastic&logo=owasp "CVE Scan")

---

### What it does: <!-- markdownlint-disable-line MD001 -->

- Displays current weather by zip code

---

### 🔗 Invite Link

[Add WeatherBot](https://discord.com/oauth2/authorize?client_id=1554292820934656000&permissions=16384&integration_type=0&scope=bot)

---

### 🖥️ Discord

#### Role Permissions:

| ⚙️ Permissions |
|:--------------:|
|   EmbedLinks   |

#### Commands:

|     📋 Task     |      🔧 Command      |
|:---------------:|:--------------------:|
| Display Weather | `/weather <zipcode>` |
|      Info       |       `/info`        |
|      Ping       |       `/ping`        |

---

### 🖧 Docker

#### Environment Variables:

|     📝 Description      | 📌 Variable |  {...} Value   |
|:-----------------------:|:-----------:|:--------------:|
|        Activity         |  ACTIVITY   |  Forecasting   |
| Embed Color<sup>1</sup> |    COLOR    |    #78866b     |
|          Debug          |    DEBUG    | true/**false** |
|        Bot Name         |    NAME     |   WeatherBot   |
|        Bot Token        |    TOKEN    |    \<token>    |

###### <sup>1</sup> #RRGGBB format <!-- markdownlint-disable-line MD001 -->

##### From `@postfmly/logoserver`:

| 📝 Description | 📌 Variable |    {...} Value    |
|:--------------:|:-----------:|:-----------------:|
|   Logo Name    |  LOGO_NAME  |  weatherbot.webp  |
|   Local Path   |  LOGO_PATH  |  ./utils/images   |
|      Port      |  LOGO_PORT  | **random**/[port] |
|    Logo URL    |  LOGO_URL   |      \<url>       |

##### From `@postfmly/checkrate`:

###### *NOTE: Rate limited to 1 request per 1 second*

#### Deployment:

|  📜 Script  |  🔧 Command   |
|:-----------:|:-------------:|
|    Full     | `./build.sh`  |
| Docker Only | `./docker.sh` |

---

### 📄 Documentation

### Generate:

```bash
./docs.sh
```

---

### 🛰️ Git & CI/CD

- **Pre-Commit:** Staged files are automatically linted
- **Github Actions:** Builds and pushes images to repository
  - latest
    - amd64
    - arm64
