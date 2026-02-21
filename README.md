# unip-auto-landing

Лёгкая посадочная для автосервиса на Next.js. Ничего лишнего: быстрый старт, шустрые анимации и готовность к продакшену.

## Что внутри
- Next.js 16 + React 19
- Tailwind CSS 4
- Framer Motion для анимаций
- Оптимизация изображений через Sharp

## Быстрый старт
1. Установить зависимости:
   ```
   npm install
   ```
2. Запустить локально:
   ```
   npm run dev
   ```
3. Сборка и запуск продакшена:
   ```
   npm run build
   npm run start
   ```

Рекомендуемая версия Node.js: 18+.

## Скрипты
- dev — локальная разработка (порт 3000)
- build — сборка standalone-режима с копированием статики
- start — запуск продакшена из .next/standalone

## Стек и структура
- `src/app` — страницы и макет (App Router)
- `public` — статические файлы
- `tailwind.config.ts` — конфигурация Tailwind
- `eslint.config.mjs` — правила линтинга

## Деплой
Сборка создаёт standalone-артефакт внутри `.next/standalone`. Его можно деплоить как обычный Node-сервис вместе с папками `.next/standalone/.next/static` и `public`.

## Лицензия
См. файл LICENSE.
