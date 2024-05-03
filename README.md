# UAV Rental Project

UAV Rental Project, drone kiralama işlemlerini kolaylaştırmak için geliştirilen bir platformdur. Bu proje, Docker, Nginx, PostgreSQL, pgAdmin, Django, Django REST Framework ve Vue.js gibi teknolojileri kullanmaktadır. Tüm projeleri tek bir adımda ayağa kaldırmak için `docker-compose up -d` komutu kullanılabilir. Vue projesi, build edilmiş halde otomatik olarak serve edilmektedir.

## Başlangıç

Projeyi başlatmak için, Docker ve Docker Compose yüklü olmalıdır. Ardından aşağıdaki adımları izleyebilirsiniz:

```bash
git clone https://github.com/furkankulaber/uav-project.git
cd uav-project
docker-compose up -d --build
```

Bu komut, projenin tüm bileşenlerini ayağa kaldıracaktır. Vue.js projesi, build edilmiş halde `localhost:80` üzerinden erişilebilir.

## Kullanım

- Django REST Framework API'larına [Swagger arayüzü](http://localhost:8000/api/swagger) veya [ReDoc arayüzü](http://localhost:8000/api/redoc) üzerinden erişebilirsiniz.
- Drone kiralama işlemleri için Vue.js kullanıcı arayüzüne `localhost:80` üzerinden erişebilirsiniz.
