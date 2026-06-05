# Keycloak React SPA

> **EN TL;DR:** React 18 + TypeScript + Vite SPA authenticating against Keycloak via OIDC
> Authorization Code Flow + PKCE (S256). Realm-role-gated route, access token kept in memory,
> silent session restore (`check-sso`), UI on PatternFly 5.

SPA на React + TypeScript + Vite, аутентифицируется в Keycloak по OIDC (Authorization Code Flow
+ PKCE). Интерфейс на PatternFly 5.

## Что реализовано

- **Keycloak / OIDC** - `keycloak-js`, Authorization Code + PKCE (`S256`), `onLoad: check-sso`
  с тихой проверкой сессии через `public/silent-check-sso.html`.
- **Login / Logout** - кнопки в шапке; после входа профиль (имя, email, роли) парсится из
  access-токена (`tokenParsed`).
- **Защищённый маршрут** - `/app` доступен только при наличии realm-роли `app-user` (иначе
  редирект на `/forbidden`); `/profile` требует только входа.
- **Обновление токена** - `updateToken` обновляет access-токен до истечения (проактивный
  интервал + `onTokenExpired`); при смерти refresh-токена показывается тост о протухшей сессии.

## Запуск

Нужны Node 18+ и Docker.

```bash
npm install            # зависимости
cp .env.example .env   # конфиг (по умолчанию указывает на локальный Keycloak)
npm run keycloak       # поднять Keycloak в Docker с авто-импортом realm
npm run dev            # http://localhost:3000
```

`npm run keycloak` поднимает преднастроенный Keycloak (realm `myrealm`, public-клиент
`react-spa` с PKCE, роль `app-user`) из `keycloak/realm-export.json`. Тестовые входы:
`user` / `user` (роль есть → доступ к `/app`) и `guest` / `guest` (роли нет → 403). Остановить -
`npm run keycloak:down`.

## Конфигурация (`.env`)

Переменные с префиксом `VITE_` попадают в браузерный бандл - секретов в них нет.

| Переменная                | По умолчанию            | Описание                       |
| ------------------------- | ----------------------- | ------------------------------ |
| `VITE_KEYCLOAK_URL`       | `http://localhost:8080` | URL сервера Keycloak           |
| `VITE_KEYCLOAK_REALM`     | `myrealm`               | realm                          |
| `VITE_KEYCLOAK_CLIENT_ID` | `react-spa`             | client id (public)             |
| `VITE_APP_REQUIRED_ROLE`  | `app-user`              | realm-роль для доступа к `/app` |

Без Docker: создайте в Keycloak realm и public-клиент (Standard flow, PKCE `S256`, redirect
`http://localhost:3000/*`, web origin `http://localhost:3000`), realm-роль `app-user` и
пользователя с этой ролью.

## Заметки

- Токен хранится только в памяти (не в `localStorage`) - меньше поверхность для XSS; сессия
  восстанавливается через `check-sso`.
- Проверка ролей на клиенте - для UX; реальную защиту данных обязан обеспечивать API.
