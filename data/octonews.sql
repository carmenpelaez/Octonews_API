DROP DATABASE IF EXISTS octonews;
CREATE DATABASE  IF NOT EXISTS `octonews` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `octonews`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: octonews
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `color` varchar(10) NOT NULL,
  `icon_image` tinytext NOT NULL,
  `background_image` tinytext NOT NULL,
  `description` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'culture','#3cc4ff9f','2134234234252.jpg','42415sa5.jpg','The category of monuments and food, of habits and drinks.'),(2,'nature','#13AF0880','339314301050201.webp','53dvadvs52.png','A category where you can breath at ease and talk about what earth give us.'),(3,'politics','#eff92d9f','5527725.png','64dsfha.jpg','debate, discussion all you can expect about politics.'),(4,'art','#ff24959f','2352352135675843.png','t34sasdf.jpg','All the news you can expect with a \"picturesque\" tone'),(5,'health','#f92d2d9f','35236216.webp','5235sfs.jpg','Here you will find all news related to health.');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(300) NOT NULL,
  `introduction_text` tinytext NOT NULL,
  `news_text` varchar(5000) NOT NULL,
  `image` tinytext,
  `creation_date` datetime NOT NULL,
  `last_update_date` datetime NOT NULL,
  `id_category` int unsigned NOT NULL,
  `id_user` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_category` (`id_category`),
  CONSTRAINT `news_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `news_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (5,'The Owl means different things in different cultures','The owl is wise and has an association with the di...','The owl is wise and has an association with the divine, through Athena, in the Greek culture that was later adapted into western culture. In the roman culture owls are associated with vampires and in the Arabic world with evil jinn. Is it not fascinating how different cultures can imagine animals so differently? From evil to good?',NULL,'2021-04-15 18:13:29','2021-04-15 18:13:29',1,3),(6,'Old City Market, Sana\'a','Old City Market, Sana\'a...','Old City Market, Sana\'a','c42a9c25-fc90-4a7a-b2f4-d63a5e55e727.jpg','2022-06-15 18:15:03','2022-06-15 18:15:03',1,3),(7,'Sigiriya in Sri Lanka.','Sigiriya is the most beautiful place in Sri Lanka....','Sigiriya is the most beautiful place in Sri Lanka.','f0144edc-f130-41e8-a68d-743e2f528cea.jpg','2022-06-05 18:19:04','2022-06-05 18:19:04',1,3),(8,'Find Your Spirit, Find Your Soul','I really enjoy animation movies for their humor an...','I really enjoy animation movies for their humor and cheerfulness. What better way to relax, than to watch Garfield shovel down 450 pounds of lasagna? However, beneath the appearance of levity and simple fun, animation has it own unique way of handling the serious and abstract philosophical questions. Spirited Away and Soul are outstanding works in this regard. They sparked my interest, and made me value what I have in my life, and look at the world with a different point of view.',NULL,'2022-06-15 18:24:30','2022-06-15 18:24:30',1,4),(9,'This is Yemen','This is Yemen....','This is Yemen.','a88583d5-091c-49bb-acdb-b255e162c6ea.jpg','2022-06-15 18:29:26','2022-06-15 18:29:26',1,4),(10,'Found dinosaur!','Europe’s largest meat-eating dinosaur found on Isl...','Europe’s largest meat-eating dinosaur found on Isle of Wight','45aae1a4-e45f-4786-92d6-2a4ffb193972.jpg','2021-04-15 18:13:29','2021-04-15 18:13:29',2,4),(11,'Rare albino Galapagos giant tortoise born in Swiss zoo','https://phys.org/news/2022-06-rare-albino-galapago...','https://phys.org/news/2022-06-rare-albino-galapagos-giant-tortoise.html','ca72bb64-7f3f-4f15-88a5-0a8014ab7ef4.jpg','2022-06-05 18:19:04','2022-06-05 18:19:04',2,7),(12,'Urban Forests Create a Birdlife Boom in New Zealand Cities','Urban Forests Create a Birdlife Boom in New Zealan...','Urban Forests Create a Birdlife Boom in New Zealand Cities',NULL,'2022-06-15 18:35:06','2022-06-15 18:35:06',2,7),(13,' Wyoming Game and Fish urges','Wyoming Game and Fish urges people not to disturb ...','Wyoming Game and Fish urges people not to disturb baby wildlife',NULL,'2022-06-15 18:35:55','2022-06-15 18:35:55',2,7),(14,'The World’s Largest Plant','The World’s Largest Plant Is a Self-Cloning Sea Gr...','The World’s Largest Plant Is a Self-Cloning Sea Grass in Australia',NULL,'2022-06-15 18:36:37','2022-06-15 18:36:37',2,3),(15,'In Australia','In Australia, a bold effort to teach rare animals ...','In Australia, a bold effort to teach rare animals to fear cats',NULL,'2022-06-15 18:37:15','2022-06-15 18:37:15',2,3),(16,' Herschel Walker','Herschel Walker, Critic of Absentee Fathers, Has a...','Herschel Walker, Critic of Absentee Fathers, Has a Second Son He Doesn’t See','24832d6e-22c6-4b32-9341-f51289044842.jpg','2021-04-15 18:13:29','2021-04-15 18:13:29',3,4),(17,'Lauren Boebert abortion claims explained','Lauren Boebert abortion claims explained...','Lauren Boebert abortion claims explained',NULL,'2022-06-15 18:38:58','2022-06-15 18:38:58',3,4),(18,'Jan. 6 panel releases Loudermilk tour footage','Jan. 6 panel releases Loudermilk tour footage...','Jan. 6 panel releases Loudermilk tour footage',NULL,'2021-08-15 18:13:29','2021-08-15 18:13:29',3,7),(19,'Democrats pressure Jan. 6 panel','Democrats pressure Jan. 6 panel to pursue criminal...','Democrats pressure Jan. 6 panel to pursue criminal referrals of Trump','e395f1df-4333-49a3-8330-bf5fdc4df3b8.jpg','2022-06-15 18:39:51','2022-06-15 18:40:40',3,7),(20,'d\'ohnut, me, colored pencil, 2022','d\'ohnut, me, colored pencil...','d\'ohnut, me, colored pencil','20143ac2-5c47-4860-bf8b-09be95efcd74.jpg','2021-04-15 18:13:29','2021-04-15 18:13:29',4,3),(21,'Toad, Me','Toad, Me, Digital, 2022...','Toad, Me, Digital, 2022','7c4da160-8965-4f36-be00-fe08aa5db623.jpg','2022-05-15 18:19:04','2022-05-15 18:19:04',4,3),(22,'\"I Want To Be Found\"','\"I Want To Be Found\", Me, Digital illustration, 20...','\"I Want To Be Found\", Me, Digital illustration, 2022','6ced3679-d232-4782-aa6c-b48f5cf69ff9.jpg','2022-06-15 18:43:15','2022-06-15 18:43:15',4,4),(23,'New Research Shows','New Research Shows Vitamin D Deficiency Leads to D...','New Research Shows Vitamin D Deficiency Leads to Dementia','c960bebb-7472-409b-99ea-77332b19b570.jpg','2021-04-15 18:13:29','2021-04-15 18:13:29',5,4),(24,'Forever chemicals linked to hypertension','Forever chemicals linked to hypertension in middle...','Forever chemicals linked to hypertension in middle-aged women',NULL,'2022-06-05 18:19:04','2022-06-05 18:19:04',5,7),(25,'FDA advisers back Moderna\'s COVID-19 vaccine','FDA advisers back Moderna\'s COVID-19 vaccine for o...','FDA advisers back Moderna\'s COVID-19 vaccine for older children',NULL,'2022-06-15 18:45:25','2022-06-15 18:45:25',5,7);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_comments`
--

DROP TABLE IF EXISTS `news_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news_comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `comment` varchar(2000) NOT NULL,
  `creation_date` datetime NOT NULL,
  `id_user` int unsigned NOT NULL,
  `id_news` int unsigned NOT NULL,
  `id_reply_message` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_news`),
  KEY `id_news` (`id_news`),
  KEY `id_reply_message` (`id_reply_message`),
  KEY `news_comments_ibfk_1` (`id_user`),
  CONSTRAINT `news_comments_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `news_comments_ibfk_2` FOREIGN KEY (`id_news`) REFERENCES `news` (`id`) ON DELETE CASCADE,
  CONSTRAINT `news_comments_ibfk_3` FOREIGN KEY (`id_reply_message`) REFERENCES `news_comments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_comments`
--

LOCK TABLES `news_comments` WRITE;
/*!40000 ALTER TABLE `news_comments` DISABLE KEYS */;
INSERT INTO `news_comments` VALUES (4,'Wow, so interesting','2022-06-15 18:25:41',4,5,NULL),(5,'Too much Crowded...','2022-06-15 18:26:34',4,6,NULL),(6,'Really?','2022-06-15 18:33:58',7,5,NULL),(7,'Yeeeah','2022-06-15 18:34:05',7,5,4),(8,'Interesting','2022-06-15 18:52:54',7,23,NULL),(9,'beautiful','2022-06-15 18:53:06',7,20,NULL),(10,'what','2022-06-15 18:53:19',7,16,NULL),(11,'As always...','2022-06-15 18:53:43',7,25,NULL),(12,'nononono','2022-06-15 18:53:51',7,17,NULL),(13,'mhhh...','2022-06-15 18:54:37',3,25,NULL),(14,'yeah...','2022-06-15 18:54:43',3,25,11),(15,'errrr','2022-06-15 18:54:55',3,19,NULL),(16,'I\'ve been there it\'s really a beautiful place','2022-06-15 18:55:18',3,9,NULL),(17,'Ow ow. ow owl','2022-06-15 18:55:52',3,5,4),(18,'what they mean with older children?','2022-06-15 18:57:14',7,25,NULL),(19,'??? I don\'t understand','2022-06-15 18:57:30',7,25,11);
/*!40000 ALTER TABLE `news_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_votes`
--

DROP TABLE IF EXISTS `news_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news_votes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `vote` tinyint NOT NULL,
  `date` datetime NOT NULL,
  `lastUpdate` datetime NOT NULL,
  `id_user` int unsigned NOT NULL,
  `id_news` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_news` (`id_news`),
  CONSTRAINT `news_votes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `news_votes_ibfk_2` FOREIGN KEY (`id_news`) REFERENCES `news` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_votes`
--

LOCK TABLES `news_votes` WRITE;
/*!40000 ALTER TABLE `news_votes` DISABLE KEYS */;
INSERT INTO `news_votes` VALUES (5,1,'2022-06-15 18:13:29','2022-06-15 18:13:29',3,5),(6,1,'2022-06-15 18:15:03','2022-06-15 18:15:03',3,6),(7,1,'2022-06-15 18:19:04','2022-06-15 18:19:04',4,7),(8,1,'2022-06-15 18:24:30','2022-06-15 18:24:30',4,8),(9,1,'2022-06-15 18:26:22','2022-06-15 18:26:22',4,5),(10,-1,'2022-06-15 18:26:35','2022-06-15 18:26:35',4,6),(11,1,'2022-06-15 18:29:26','2022-06-15 18:29:26',7,9),(12,1,'2022-06-15 18:32:00','2022-06-15 18:32:00',7,10),(13,1,'2022-06-15 18:33:20','2022-06-15 18:33:20',7,11),(14,1,'2022-06-15 18:35:06','2022-06-15 18:35:06',3,12),(15,0,'2022-06-15 18:35:55','2022-06-15 18:54:13',3,13),(16,0,'2022-06-15 18:36:37','2022-06-15 18:52:30',7,14),(17,1,'2022-06-15 18:37:15','2022-06-15 18:37:15',7,15),(18,1,'2022-06-15 18:38:19','2022-06-15 18:38:19',7,16),(19,-1,'2022-06-15 18:38:58','2022-06-15 18:52:29',7,17),(20,-1,'2022-06-15 18:39:13','2022-06-15 18:52:35',7,18),(21,1,'2022-06-15 18:39:51','2022-06-15 18:39:51',7,19),(22,-1,'2022-06-15 18:41:54','2022-06-15 18:52:39',7,20),(23,1,'2022-06-15 18:42:33','2022-06-15 18:42:33',7,21),(24,1,'2022-06-15 18:43:15','2022-06-15 18:43:15',7,22),(25,0,'2022-06-15 18:44:21','2022-06-15 18:52:41',7,23),(26,1,'2022-06-15 18:44:49','2022-06-15 18:44:49',7,24),(27,-1,'2022-06-15 18:45:25','2022-06-15 18:52:27',7,25),(28,-1,'2022-06-15 18:52:32','2022-06-15 18:52:32',7,12),(29,1,'2022-06-15 18:52:33','2022-06-15 18:52:33',7,6),(30,1,'2022-06-15 18:52:37','2022-06-15 18:52:37',7,5),(31,-1,'2022-06-15 18:54:06','2022-06-15 18:54:06',3,25),(32,1,'2022-06-15 18:54:07','2022-06-15 18:54:07',3,22),(33,-1,'2022-06-15 18:54:08','2022-06-15 18:54:08',3,17),(34,-1,'2022-06-15 18:54:09','2022-06-15 18:54:09',3,19),(35,1,'2022-06-15 18:54:10','2022-06-15 18:54:10',3,15),(36,1,'2022-06-15 18:54:11','2022-06-15 18:54:11',3,14),(37,1,'2022-06-15 18:54:15','2022-06-15 18:54:15',3,9),(38,1,'2022-06-15 18:54:16','2022-06-15 18:54:16',3,7),(39,1,'2022-06-15 18:54:17','2022-06-15 18:54:17',3,11),(40,-1,'2022-06-15 18:54:19','2022-06-15 18:54:19',3,18),(41,1,'2022-06-15 18:54:20','2022-06-15 18:54:20',3,24),(42,1,'2022-06-15 18:54:23','2022-06-15 18:54:23',3,16);
/*!40000 ALTER TABLE `news_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` tinytext NOT NULL,
  `biography` tinytext,
  `avatar` tinytext,
  `creation_date` datetime NOT NULL,
  `last_update_date` datetime NOT NULL,
  `authenticated` tinyint(1) DEFAULT '0',
  `registrationCode` tinytext,
  `passwordUpdateCode` tinytext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Rodolfo24','jfeena@gmail.com','b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86',NULL,'84f69609-33b0-43f8-9b20-23a4909a78c1.jpg','2022-06-15 18:04:14','2022-06-15 18:10:22',1,NULL,NULL),(4,'Maria','test@gmail.com','b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86',NULL,'a252bf69-8339-43ae-a01a-a9782fe0fa72.jpg','2022-06-15 18:05:50','2022-06-15 18:16:48',1,NULL,NULL),(7,'Edu','email@gmail.com','b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86',NULL,NULL,'2022-06-15 18:08:58','2022-06-15 18:08:58',1,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-15 21:01:49
