CREATE DATABASE  IF NOT EXISTS `hmje` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hmje`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: hmje.c2dmjuulvzgw.ap-northeast-2.rds.amazonaws.com    Database: hmje
-- ------------------------------------------------------
-- Server version	8.0.31

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `badge`
--

DROP TABLE IF EXISTS `badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badge` (
  `badge_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `badge_detail` varchar(255) DEFAULT NULL,
  `badge_image` varchar(255) DEFAULT NULL,
  `badge_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`badge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badge`
--

LOCK TABLES `badge` WRITE;
/*!40000 ALTER TABLE `badge` DISABLE KEYS */;
INSERT INTO `badge` VALUES (1,'0000-00-00 00:00:00.000000','2023-03-21 09:27:23.884000','홍민정음에 처음 입문한자','1','새내기'),(2,'2023-03-22 15:29:15.270000','2023-03-22 15:29:15.270000','10일 누적 출석','2','홍민서당 서당개'),(3,'2023-03-22 15:29:30.475000','2023-03-22 15:29:30.475000','30일 누적 출석','3','홍민서당 유생'),(4,'2023-03-22 15:29:43.935000','2023-03-22 15:29:43.935000','90일 누적 출석','4','홍민서당 선비'),(5,'2023-03-22 15:30:02.152000','2023-03-22 15:30:02.152000','365일 누적 출석','5','홍민서당 승지'),(6,'2023-03-22 15:30:57.905000','2023-03-22 15:30:57.905000','10일 연속 출석','6','집현전 막내'),(7,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','30일 연속 출석','7','집현전 학자'),(8,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','90일 연속 출석','8','세종대왕님께 눈도장'),(9,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','365일 연속 출석','9','세종대왕님의 애제자'),(10,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','총 학습시간 1시간','10','석봉이는 붓 잡는 중'),(11,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','총 학습시간 24시간','11','석봉이는 글 쓰는 중'),(12,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','총 학습시간 72시간','12','석봉이는 책 내는 중'),(13,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','총 학습시간 360시간','13','석봉이는 떡도 써는 중'),(14,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','문맥도감 전체 획득','14','문맥 훈장님'),(15,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','문맥도감 특별카드 전체 획득','15','문맥 수집가'),(16,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','한글날 접속자','16','한글을 사랑하는 자'),(17,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','세종대왕님 생신 5/15 접속자','17','세종대왕을 사랑하는 자'),(18,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','캐릭터 100번 클릭','18','말랑말랑 희귀소지품'),(19,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','첫 일주일 이벤트 칭호','19','일찍 일어나는 새'),(20,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','제 1회 과거시험 우수자','20','제 1회 장원급제'),(21,'2023-03-22 15:31:11.203000','2023-03-22 15:31:11.203000','홍민정음 초기 테스트 참여자','21','홍민정음 유령'),(22,'2023-03-30 09:57:11.203000','2023-03-31 15:29:35.712000','알림에 호기심이 많은 당신','22','명탐정 코난'),(23,'2023-03-30 09:57:11.203000','2023-03-31 15:34:07.458000','홍민정음을 사랑한자','23','홍민정음 홍보대사');
/*!40000 ALTER TABLE `badge` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-04 15:33:51
