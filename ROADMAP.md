# Lộ Trình Học Fullstack: Next.js + FastAPI

> **Project thực hành:** Personal Blog (blog cá nhân)
> **Kiến trúc:** Next.js (Frontend) + FastAPI (Backend) + PostgreSQL (Database)
> Mỗi giai đoạn sẽ xây dựng thêm tính năng cho project này.

```
┌─────────────────┐       ┌─────────────────┐       ┌──────────────┐
│   Next.js (FE)  │ ───── │  FastAPI (BE)   │ ───── │  PostgreSQL  │
│   Port 3000     │  API  │   Port 8000     │  ORM  │   Database   │
│                 │ fetch │                 │       │              │
│ - shadcn/ui     │       │ - SQLAlchemy    │       │              │
│ - Tailwind CSS  │       │ - Pydantic      │       │              │
└─────────────────┘       └─────────────────┘       └──────────────┘
```

### Cấu trúc thư mục project

```
Projects/Nextjs/
├── frontend/          # Next.js app
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── package.json
├── backend/           # FastAPI app
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   ├── models/
│   │   └── schemas/
│   ├── requirements.txt
│   └── .env
└── ROADMAP.md
```

---

## Giai đoạn 0: Kiến thức nền tảng (Trước khi bắt đầu)

### Phía Frontend
- [ ] HTML, CSS cơ bản
- [ ] JavaScript cơ bản (ES6+): arrow function, destructuring, async/await, fetch API
- [ ] React cơ bản: component, props, state, useState, useEffect
- [ ] Node.js & npm cơ bản

### Phía Backend
- [ ] Python cơ bản: function, class, list, dict, type hints
- [ ] pip & virtual environment (venv)
- [ ] HTTP cơ bản: GET, POST, PUT, DELETE, status code

> Nếu đã biết React + Python cơ bản thì nhảy thẳng sang Giai đoạn 1.

---

## Giai đoạn 1: Khởi tạo 2 project

**Mục tiêu:** Tạo được 2 project chạy song song, FE gọi được API từ BE.

### Frontend - Next.js
- [x] Khởi tạo: `npx create-next-app@latest frontend`
- [x] Tìm hiểu cấu trúc thư mục: `app/`, `public/`, `next.config.js`
- [ ] Tạo trang Home (`app/page.tsx`)
- [ ] Tạo trang About (`app/about/page.tsx`)
- [ ] Tạo trang Blog (`app/blog/page.tsx`)
- [x] Chạy: `npm run dev` (port 3000)

### Backend - FastAPI
- [x] Tạo thư mục `backend/`, khởi tạo virtual env: `python -m venv venv`
- [x] Cài đặt: `pip install fastapi uvicorn`
- [ ] Tạo `main.py` với endpoint `GET /` trả về `{"message": "Hello"}`
- [ ] Chạy: `uvicorn app.main:app --reload` (port 8000)
- [ ] Truy cập Swagger docs tại `http://localhost:8000/docs`
- [ ] Cấu hình CORS để Frontend gọi được API

### Kiểm tra kết nối
- [ ] Từ Next.js, gọi `fetch("http://localhost:8000/")` và hiển thị kết quả

### Kết quả đạt được
> 2 project chạy song song, FE gọi được API từ BE, thấy kết quả trên trình duyệt

---

## Giai đoạn 2: Layout, Navigation và shadcn/ui

**Mục tiêu:** Tạo giao diện đẹp với shadcn/ui, layout chung cho website.

### Lý thuyết
- [ ] Layout trong Next.js (`layout.tsx`)
- [ ] Component `<Link>` để điều hướng
- [ ] Tailwind CSS cơ bản (đã được tích hợp sẵn)
- [ ] shadcn/ui là gì? (UI components đẹp, dùng Radix UI + Tailwind)
- [ ] Cách shadcn/ui khác với MUI, Ant Design (copy code vào project, không phải npm package)

### Thực hành
- [ ] Cài đặt shadcn/ui: `npx shadcn@latest init`
- [ ] Thêm components: `npx shadcn@latest add button card navigation-menu`
- [ ] Tạo Root Layout với Header và Footer
- [ ] Tạo thanh Navigation dùng `NavigationMenu` của shadcn/ui
- [ ] Tạo component riêng: `Header`, `Footer`, `Navbar`
- [ ] Tìm hiểu thư mục `components/ui/` (nơi shadcn lưu component)

### Kết quả đạt được
> Website có Header/Footer chung, thanh menu điều hướng đẹp với shadcn/ui

---

## Giai đoạn 3: FastAPI CRUD API + Hiển thị bài viết

**Mục tiêu:** Xây dựng API hoàn chỉnh và hiển thị dữ liệu trên FE.

### Backend - Xây dựng API
- [ ] Hiểu Pydantic schema (validate dữ liệu đầu vào)
- [ ] Tạo dữ liệu mẫu trong memory (list các bài viết)
- [ ] `GET /api/posts` - lấy danh sách bài viết
- [ ] `GET /api/posts/{slug}` - lấy chi tiết 1 bài viết
- [ ] `POST /api/posts` - tạo bài viết mới
- [ ] `PUT /api/posts/{slug}` - cập nhật bài viết
- [ ] `DELETE /api/posts/{slug}` - xóa bài viết
- [ ] Test API bằng Swagger UI (`/docs`)

### Frontend - Hiển thị dữ liệu
- [ ] Dynamic routes: `app/blog/[slug]/page.tsx`
- [ ] Server Component vs Client Component ("use client")
- [ ] Tạo service/lib để gọi API: `lib/api.ts`
- [ ] Hiển thị danh sách bài viết trên trang Blog
- [ ] Tạo component `BlogCard` dùng `Card` của shadcn/ui
- [ ] Tạo trang chi tiết bài viết
- [ ] Xử lý trường hợp bài viết không tồn tại (404)

### Kết quả đạt được
> FE hiển thị danh sách bài viết từ API, click vào xem chi tiết

---

## Giai đoạn 4: Database với SQLAlchemy

**Mục tiêu:** Lưu trữ dữ liệu thật vào PostgreSQL.

### Lý thuyết
- [ ] ORM là gì? SQLAlchemy cơ bản
- [ ] Model, Session, Query
- [ ] Alembic - migration tool (quản lý thay đổi database)
- [ ] PostgreSQL cơ bản (hoặc dùng SQLite để bắt đầu cho đơn giản)

### Backend - Kết nối Database
- [ ] Cài đặt: `pip install sqlalchemy alembic psycopg2-binary python-dotenv`
- [ ] Tạo file `database.py` (kết nối DB)
- [ ] Tạo model `Post` (id, title, slug, content, created_at, updated_at)
- [ ] Chạy migration: `alembic init` và `alembic revision --autogenerate`
- [ ] Cập nhật các API endpoint để đọc/ghi từ database
- [ ] Tạo script seed dữ liệu mẫu

### Frontend - Không thay đổi
> FE vẫn gọi API như cũ, không cần biết BE đổi từ memory sang database

### Kết quả đạt được
> Dữ liệu được lưu trữ thật trong database, không mất khi restart server

---

## Giai đoạn 5: Form và Trang Admin

**Mục tiêu:** Tạo giao diện quản trị để thêm/sửa/xóa bài viết.

### Lý thuyết
- [ ] Form handling trong React (controlled components)
- [ ] React Hook Form + Zod validation
- [ ] HTTP methods: POST, PUT, DELETE từ Frontend
- [ ] Optimistic UI update

### Frontend - Trang Admin
- [ ] Cài đặt: `npx shadcn@latest add table dialog form input textarea toast`
- [ ] Tạo trang Admin: `app/admin/page.tsx`
- [ ] Hiển thị danh sách bài viết dùng `Table` của shadcn/ui
- [ ] Form tạo bài viết mới dùng `Dialog` + `Form`
- [ ] Form sửa bài viết
- [ ] Nút xóa bài viết với xác nhận (`AlertDialog`)
- [ ] Thông báo thành công/thất bại dùng `Toast`
- [ ] Tạo trang Contact với form gửi liên hệ

### Backend - API bổ sung
- [ ] `POST /api/contact` - nhận form liên hệ
- [ ] Validate dữ liệu đầu vào với Pydantic
- [ ] Trả về error message rõ ràng khi dữ liệu không hợp lệ

### Kết quả đạt được
> Có trang Admin đầy đủ CRUD, form liên hệ hoạt động

---

## Giai đoạn 6: Authentication (Xác thực người dùng)

**Mục tiêu:** Bảo vệ trang Admin, chỉ admin mới truy cập được.

### Lý thuyết
- [ ] Authentication vs Authorization
- [ ] JWT (JSON Web Token) là gì?
- [ ] Flow: Login -> nhận token -> gửi token theo mỗi request
- [ ] Password hashing với bcrypt
- [ ] Middleware trong Next.js (bảo vệ route phía FE)

### Backend - Auth API
- [ ] Cài đặt: `pip install python-jose[cryptography] passlib[bcrypt]`
- [ ] Tạo model `User` (id, email, hashed_password, is_admin)
- [ ] `POST /api/auth/register` - đăng ký
- [ ] `POST /api/auth/login` - đăng nhập, trả về JWT token
- [ ] `GET /api/auth/me` - lấy thông tin user hiện tại
- [ ] Tạo dependency `get_current_user` để bảo vệ API
- [ ] Bảo vệ các API tạo/sửa/xóa bài viết (cần token)

### Frontend - Login UI
- [ ] Tạo trang đăng nhập: `app/login/page.tsx` dùng shadcn/ui (`Input`, `Label`, `Button`)
- [ ] Lưu JWT token vào cookie/localStorage
- [ ] Tạo context/hook `useAuth` để quản lý trạng thái đăng nhập
- [ ] Hiển thị trạng thái đăng nhập trên Header dùng `Avatar`, `DropdownMenu`
- [ ] Thêm nút Đăng xuất trong dropdown menu
- [ ] Middleware bảo vệ route `/admin` (redirect về login nếu chưa đăng nhập)

### Kết quả đạt được
> Chỉ admin đăng nhập mới có thể thêm/sửa/xóa bài viết

---

## Giai đoạn 7: Tối ưu và Hoàn thiện

**Mục tiêu:** Tối ưu hiệu năng, SEO, và hoàn thiện UX.

### Frontend
- [ ] Image Optimization với `next/image`
- [ ] Metadata và SEO (`generateMetadata`) cho mỗi trang
- [ ] Tạo `loading.tsx` dùng `Skeleton` của shadcn/ui
- [ ] Tạo `error.tsx` dùng `Alert` của shadcn/ui
- [ ] Tạo `not-found.tsx` tùy chỉnh
- [ ] Responsive design (tương thích mobile)
- [ ] Dark mode với shadcn/ui theme

### Backend
- [ ] Error handling toàn cục (exception handler)
- [ ] Logging (ghi log request/response)
- [ ] Pagination cho API list bài viết (`?page=1&limit=10`)
- [ ] Search API (`?search=keyword`)
- [ ] Rate limiting (chống spam API)

### Kết quả đạt được
> Website nhanh, đẹp, thân thiện SEO, BE ổn định và bảo mật

---

## Giai đoạn 8: Docker và Deploy

**Mục tiêu:** Đóng gói và đưa project lên Internet.

### Lý thuyết
- [ ] Docker cơ bản: image, container, Dockerfile
- [ ] Docker Compose (chạy nhiều service cùng lúc)
- [ ] Environment variables (.env)

### Thực hành - Docker
- [ ] Viết `Dockerfile` cho Backend (FastAPI)
- [ ] Viết `Dockerfile` cho Frontend (Next.js)
- [ ] Viết `docker-compose.yml` (FE + BE + PostgreSQL)
- [ ] Chạy toàn bộ project bằng `docker compose up`

### Thực hành - Deploy
- [ ] Push code lên GitHub
- [ ] Deploy Frontend lên **Vercel** (miễn phí)
- [ ] Deploy Backend lên **Railway** hoặc **Render** (miễn phí)
- [ ] Deploy PostgreSQL lên **Supabase** hoặc **Neon** (miễn phí)
- [ ] Cấu hình environment variables trên mỗi platform
- [ ] Test toàn bộ flow trên production

### Kết quả đạt được
> Project online hoàn chỉnh: FE trên Vercel, BE trên Railway, DB trên Supabase

---

## Tài nguyên học tập

### Documentation chính thức
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com
- FastAPI: https://fastapi.tiangolo.com
- SQLAlchemy: https://docs.sqlalchemy.org
- Alembic: https://alembic.sqlalchemy.org
- Docker: https://docs.docker.com

### Mẹo học hiệu quả
1. **Học đến đâu, code đến đó** - Đừng chỉ đọc lý thuyết
2. **FE và BE chạy song song** - Mở 2 terminal, 1 cho FE, 1 cho BE
3. **Test API bằng Swagger UI** - FastAPI tự tạo docs tại `/docs`, rất tiện
4. **Không hiểu thì hỏi** - Hỏi Claude Code, Stack Overflow, Google
5. **Đọc lỗi cẩn thận** - Error message là bạn, không phải kẻ thù
6. **Commit thường xuyên** - Dùng git để lưu tiến trình
7. **Không sợ sai** - Sai rồi sửa, đó là cách học tốt nhất

---

### Tổng quan các giai đoạn

| Giai đoạn | Nội dung | FE/BE |
|-----------|----------|-------|
| 0 | Kiến thức nền tảng | Cả hai |
| 1 | Khởi tạo 2 project, kết nối | FE + BE |
| 2 | Layout, shadcn/ui | FE |
| 3 | CRUD API + hiển thị bài viết | FE + BE |
| 4 | Database SQLAlchemy | BE |
| 5 | Form, trang Admin | FE + BE |
| 6 | Authentication JWT | FE + BE |
| 7 | Tối ưu, hoàn thiện | FE + BE |
| 8 | Docker, Deploy | DevOps |

---

> Chúc bạn học vui và thành công! Hãy bắt đầu từ Giai đoạn 1 ngay hôm nay.
> Khi sẵn sàng, hãy nói với Claude Code để bắt đầu code cùng nhau!
