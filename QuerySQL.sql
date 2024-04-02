create DATABASE	rede_social_yt;

use rede_social_yt;

create table `rede_social_yt`.`user`(
	`id` int not null auto_increment,
    `username` varchar(45) not null,
    `email` varchar(100) not null,
    `password` varchar(200) not null,
    `userImg` varchar(300) null,
    `bgImg` varchar(300) null,
    primary key (`id`)
) auto_increment=1;

INSERT INTO `rede_social_yt`.`user` (`username`, `email`, `password`, `userImg`) 
VALUES ('teste', 'teste@email.com', 'teste', 'https://media.licdn.com/dms/image/C4D03AQEVBgVwSg-9MA/profile-displayphoto-shrink_800_800/0/1659017148515?e=1703116800&v=beta&t=UwguvowD8hvA3IkrclGUVTDk-Y2PhK4APjr0bFm8UTM');

select * from user;

select * from likes;

update `user`
set userImg = 'https://media.licdn.com/dms/image/C4D03AQEVBgVwSg-9MA/profile-displayphoto-shrink_200_200/0/1659017148515?e=1701907200&v=beta&t=UX_62yQMv8pI6WytsKREa7bhcXa5GjHyt_2lIT3G8B4'
where `id` = 3;

update `user`
set bgImg = 'https://static.significados.com.br/foto/paisagem-natural-og.jpg'
where `id` = 3;


create table `rede_social_yt`.`posts` (
 `id` int not null auto_increment,
 `post_desc` varchar(200) null,
 `img` varchar(300) null,
 
 
 
 
 `userId` int not null,
 primary key(`id`),
 constraint `userId`
 foreign key(`userId`)
 references `rede_social_yt`.`user`(`id`)
 on delete cascade
 on update cascade)
 auto_increment=1;

alter table posts add created_at timestamp default current_timestamp;

select * from posts;

/* para retonar tudo das duas tabelas e juntar a informação com um Join*/
select * from posts as p join user as u on (u.id = p.userId);

/* para retornar informações especificas das duas tabelas e juntar com um Join */
select p.*, u.username, userImg from posts as p join user as u on (u.id = p.userId);


create table `rede_social_yt`.`coments`(
`id` int not null auto_increment,
`comment_desc` varchar(200) not null,
`comment_user_Id` int not null,
`post_id` int not null,
`created_at` timestamp default current_timestamp,
primary key(`id`),
constraint `comment_user_Id`
foreign key (`comment_user_Id`)
references `rede_social_yt`.`user`(`id`)
on delete cascade
on update cascade,
constraint `post_id`
foreign key (`post_id`)
references `rede_social_yt`.`posts`(`id`)
on delete cascade
on update cascade)
auto_increment=1;


alter table posts add created_at timestamp default current_timestamp;

select * from posts;

select * from posts as p join user as u on (u.id = p.userId);

select p.*,u.username, userImg  from posts as p join user as u on (u.id = p.userId);

delete from posts where userId = 1;

RENAME TABLE coments TO comments;

delete from user where id = 1; 

create table `rede_social_yt`.`likes`(
`id` int not null auto_increment,
`likes_user_id` int not null,
`likes_post_id` int not null,
primary key(`id`),
constraint `likes_user_id`
foreign key (`likes_user_id`)
references `rede_social_yt`.`user`(`id`)
on delete cascade
on update cascade,
constraint `likes_post_id`
foreign key (`likes_post_id`)
references `rede_social_yt`.`posts`(`id`)
on delete cascade
on update cascade)
auto_increment=1;

INSERT INTO likes (`likes_use_id`, `likes_post_id`) value (4,15);

UPDATE user
SET id = 3
WHERE id = 1;

use rede_social_yt;

SELECT * FROM user;

create table `rede_social_yt`.`friendship`(
`id` int not null auto_increment,
`follower_id` int not null,
`followed_id` int not null,
primary key(`id`),
constraint `follower_id`
foreign key (`follower_id`)
references `rede_social_yt`.`user`(`id`)
on delete cascade
on update cascade,
constraint `followed_id`
foreign key (`followed_id`)
references `rede_social_yt`.`user`(`id`)
on delete cascade
on update cascade)
auto_increment=1;

SELECT * FROM user;

insert into friendship (`follower_id`, `followed_id`) values(3,6);

SELECT * FROM friendship;

DROP TABLE user;

select * from posts as p join user as u on (u.id = p.userId) where p.post_desc like '%pri%';


use rede_social_yt;



SELECT f.*, u.username, userImg FROM friendship as f join user as u ON (u.id = followed_id) WHERE follower_id = 3;





