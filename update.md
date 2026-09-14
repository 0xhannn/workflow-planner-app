# Workflow Planner — Project Handoff & Update Log

> **WAJIB DIBACA AGENT BARU SEBELUM MENGUBAH CODE.**
>
> File ini menjaga konteks repo agar agent/developer lain dapat melanjutkan coding tanpa riwayat chat.

## Aturan Wajib

1. `main` adalah source of truth. Setiap perubahan code ke `main` wajib tercatat.
2. Project ini adalah local-first/public install; jangan memasukkan production private data/secrets/cloud keys.
3. Perubahan update/install flow Windows harus tetap bisa digunakan user non-teknis.
4. Jangan menulis PIN aktual/session secret/credential ke dokumentasi ini.

---

## Project Identity

- Repository: `0xhannn/workflow-planner-app`
- Branch: `main`
- Produk: local Workflow Planner untuk design pipeline, tasks, product gallery, dan team poll.
- Runtime: Python app dengan local data/uploads.
- Default local URL: `http://127.0.0.1:8080`.
- Windows flow: `install.bat` → `start.bat`; update via `update.bat`/banner flow.
- Mac/Linux dapat menjalankan Python virtualenv secara manual.

## Product Boundaries

Public repo ini sengaja:

- tidak membawa production database;
- tidak membawa secrets/cloud keys;
- menyimpan upload di mesin user (`uploads/`);
- memakai brand default yang dapat diubah admin.

Jangan menambahkan auto-sync ke private production environment tanpa requirement eksplisit.

## Current Features

- workflow/design pipeline planning;
- task management;
- product gallery;
- team poll;
- admin mode untuk edit capability;
- custom brand/name/logo;
- PWA/favicon assets;
- update/version awareness.

## Admin / Session

- Admin flow menggunakan PIN dari environment/config local.
- Session secret dibuat/stabil secara lokal agar PIN session tidak rusak tiap restart.
- Jangan hard-code credential atau menaruh session secret ke Git.

## Update Flow — Important

Current Windows update UX dirancang seperti flow tool desktop sederhana:

- app mendeteksi versi/update;
- banner memberi command/action update;
- user copy command/menjalankan update dan app dihentikan untuk menghindari Windows file lock;
- `start.bat` digunakan untuk relaunch;
- `.env`, `data/`, dan `uploads/` harus tetap dipertahankan saat update.

Jangan membuat updater overwrite local data/config.

## PH Promo / Shared Banner Context

Repo pernah menerima shared PH-CHAIN / PH-SHOP promo banner yang:

- dapat diinjeksi melalui update/banner asset;
- memakai cache-busting/service-worker handling;
- close bersifat sementara sesuai behavior current.

Jika banner diubah/dihapus, pastikan tidak merusak app shell, service worker, atau update path.

## Verification

Setelah perubahan:

- run app local;
- test admin login/session jika auth berubah;
- test task/gallery/poll flow terkait;
- pada Windows-facing update changes, verifikasi `install.bat`, `start.bat`, dan `update.bat` secara nyata bila memungkinkan;
- cek local data/uploads tetap aman saat update;
- test service worker/cache bila frontend assets berubah;
- jangan klaim PASS jika belum dijalankan.

## Agent Handoff Checklist

- Pull `main` terbaru.
- Baca `README.md` dan setup docs terkait.
- Jangan memasukkan private production data.
- Pertahankan local-first update/install semantics.
- Update handoff manual bila product/architecture berubah.

---

<!-- AUTO-CHANGELOG:START -->
## Status `main` terbaru — otomatis

Baseline saat handoff dibuat:

- Commit: `0cec1c3`
- Message: `fix(v1.0.4): rewel PH promo — close only 12s then full banner returns`
- Tanggal handoff: 2026-09-14

> Akan disegarkan otomatis pada push code berikutnya ke `main`.
<!-- AUTO-CHANGELOG:END -->

# Change Log Manual

## 2026-09-14

- Menambahkan durable handoff untuk local-first boundaries, admin/session, Windows updater, shared promo/banner context, dan verification rules.
