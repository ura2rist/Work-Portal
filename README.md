<h1 align="center">Телефонный справочник</h1>
<p>OC ubuntu 18.04</p>
<h4 align="center">Стандартный логин и пароль от ЛК</h4>
<p>Логин: admin</p>
<p>Пароль: 12345</p>
<h3 align="center">Шаг 1. Установка и настройка mysql</h3>
<p>Заходим в терминал сервера и вводим команды:</p>
<p>apt-get update - синхронизируем список пакетов</p>
<p>apt-get install mysql-server - установка mysql</p>
<p>mysql_secure_installation - настройка mysql</p>
<p>mysql - войти в терминал mysql</p>
<p>Далее в терминале mysql вводим:</p>
<p>create database portal character set UTF8 collate utf8_general_ci; - создаем базу данных с нужной кодировкой</p>
<p>CREATE USER 'имя_пользователя'@'localhost' IDENTIFIED BY 'пароль'; - создание пользователя</p>
<p>GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, RELOAD, PROCESS, REFERENCES, INDEX, ALTER, SHOW DATABASES, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE, REPLICATION SLAVE, REPLICATION CLIENT, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, CREATE USER, EVENT, TRIGGER ON *.* TO 'имя пользователя'@'localhost' WITH GRANT OPTION; - выдаем права пользователю</p>
<p>exit; - выйти из терминала mysql</p>
<h3 align="center">Шаг 2. Установка curl</h3>
<p>apt-get install curl - установка пакета curl</p>
<h3 align="center">Шаг 3. Установка node.js</h3>
<p>curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh - загрузка скрипта</p>
<p>bash nodesource_setup.sh - запуск скрипта</p>
<p>apt-get install nodejs - установка node.js той версии, которую скачали</p>
<h3 align="center">Шаг 4. Установка apache</h3>
<p>apt-get install apache2 - установка apache</p>
<h3 align="center">Шаг 5. Настройка backend</h3>
<p>В ftp клиенте переходим в папку /var/www/html и загружаем на сервер папку backend</p>
<p>В ftp клиенте переходим в папку backend и открываем файл config.js</p>
<p>Изменяем имя пользователя и пароль на те, что указывали при создании пользователя. Меняем секретные слова для jwt токенов</p>
<p>Возвращаемся к терминалу, переходим в папку /var/www/html/backend и пишем npm i - загружаем зависимости</p>
<h3 align="center">Шаг 6. Настройка frontend</h3>
<p>Переходим в папку на пк где лежит наш загруженный репозиторий, открываем терминал и пишем npm i - загружаем зависимости, на вашем пк должен быть установлен node.js</p>
<p>Переходим там же в папку src, в папке api файл fetchApi.js и http файл index.js меняем адрес нашего сервера</p>
<p>В терминале пишем npm run build - билдим приложение</p>
<p>Содержимое папки build заливаем на сервер в /var/www/html</p>
<h3 align="center">Шаг 7. Настройка apache</h3>
<p>На сервере открываем в текстовом редакторе файл /etc/apache2/sites-enabled/000-default.conf</p>
<p>Внутри VirtualHost добавляем следующую запись:</p>
<pre>
&lt;Directory "/var/www/html">
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteRule ^ index.html [L]
Options -Indexes
&lt;/Directory>
</pre>
<p>Данные правила позволят избежать 404 ошибки при обновлении страницы и запретят показывать список файлов пользователю</p>
<p>Под Directory добавляем еще правила</p>
<pre>
&lt;Location "/backend/public">  
AllowOverride None  
Order Allow,Deny  
Allow from All  
&lt;/Location>  

&lt;Location "/backend/">
AllowOverride None
Order Deny,Allow
Deny from All
Allow from 10.10.10.10
&lt;/Location>
</pre>
<p>Эти правила запретят пользователю просматривать файлы через браузер</p>
<p>Затем в терминале сервера пишем a2enmod rewrite </p>
<p>И перезапускаем apache командой service apache2 restart</p>
<h3 align="center">Шаг 8. Настройка и установка pm2</h3>
<p>npm install pm2 -g - установка пакета pm2 глобально</p>
<p>pm2 start index.js - запуск нашего backend</p>
<p>pm2 startup - генерация сценария запуска</p>
<p>pm2 save - сохранение списка приложений</p>
<p>Последние 2 шага сделаны для того, что бы приложение автоматически поднималось когда сервер перезапускается</p>
