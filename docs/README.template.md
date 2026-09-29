# ![WeatherBot](./utils/images/weatherbot.webp) WeatherBot

> - WeatherBot for Discord

---

![Bun](https://img.shields.io/badge/Bun-$_bun-informational?style=plastic&logo=bun "Bun") &nbsp;
![discord.js](https://img.shields.io/badge/discord.js-$_discord-informational?style=plastic&logo=discord.js "discord.js")

![CodeQL](https://github.com/$_user/$_repo/workflows/CodeQL/badge.svg "CodeQL") &nbsp;
![Coverage](https://img.shields.io/badge/Coverage-$_coverage%25-success?style=plastic&logo=jest "Coverage")

![NO AI](https://img.shields.io/badge/NO-AI-orange?style=plastic "NO AI") &nbsp;
![License](https://img.shields.io/github/license/$_user/$_repo?style=plastic&color=blueviolet&label=License&logo=gplv3 "GPLv3") &nbsp; <!-- markdownlint-disable MD013 -->
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

| 📝 Description | 📌 Variable |  {...} Value   |
|:--------------:|:-----------:|:--------------:|
|  Embed Color   |    COLOR    |    #78866b     |
|     Debug      |    DEBUG    | true/**false** |
|    Logo URL    |  LOGO_URL   |     [url]      |
|    Bot Name    |    NAME     |   WeatherBot   |
|   Bot Token    |    TOKEN    |    [token]     |

##### From `@postfmly/logoserver`:

| 📝 Description | 📌 Variable |    {...} Value    |
|:--------------:|:-----------:|:-----------------:|
|   IPv4/IPv6    |  LOGO_IPv6  |  true/**false**   |
|   Logo Name    |  LOGO_NAME  |  weatherbot.webp  |
|   Local Path   |  LOGO_PATH  |  ./utils/images   |
|      Port      |  LOGO_PORT  | **Random**/[port] |

##### From `@postfmly/checkrate`:

| 📝 Description | 📌 Variable | {...} Value |
|:--------------:|:-----------:|:-----------:|
| Request Limit  |    RATE     |      1      |

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
