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
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `faq_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`faq_id`),
  KEY `FKindd77321r69a4vielp3cloel` (`user_id`),
  CONSTRAINT `FKindd77321r69a4vielp3cloel` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
INSERT INTO `faq` VALUES (2,'2023-03-28 09:27:53.967000','2023-03-28 14:29:37.679000','메인페이지에서 보이는 단어학습, 문맥학습은 중복 단어를 제외한 맞춘 단어 갯수로 산정됩니다.\n\n문맥학습의 맞춘 단어 중복 갯수는 마이페이지의 **“오늘의 학습 그래프”** 에 반영됩니다.','[학습관리] 학습 단어 갯수는 어떻게 산정되나요?',3),(3,'2023-03-28 09:34:28.322000','2023-03-28 14:29:54.986000','오늘의 학습 그래프는 **문맥학습의 중복 정답을 포함한** 문맥 학습과 단어 학습의 정답 갯수입니다.','[학습관리] 오늘의 단어와 오늘의 학습 그래프가 차이가 나요!',3),(4,'2023-03-28 21:09:37.818000','2023-03-28 21:38:15.446000','홍민정음의 등급은 조선시대의 관직이름에서 따온 이름을 사용하고 있어요.\n정9품부터 정8품, 정7품 ... 정1품까지로 이루어져 있답니다.\n학교 성적에서 1등급이 가장 높은 것처럼요(❁´◡`❁)','[사용자] 왜 정9품부터 시작인가요?',3),(5,'2023-03-28 21:35:26.467000','2023-03-28 21:35:26.467000','단어학습에서 다음문제로 넘어갈 때는 **shift** 키를 눌러 쉽게 넘어갈 수 있습니다!\n즐거운 학습 되세요 （￣︶￣）↗　','[단어학습] 단어학습 결과창에서 넘어가기가 불편해요',3),(6,'2023-03-29 17:14:55.664000','2023-03-29 17:15:42.009000','현재 과거시험은 응시 기간동안 점수만 알 수 있는데요,\n많은 분들의 요청에 따라 응시 기간이 끝나면 **과거시험 보고서**를 공개할 예정입니다.\n\n1회차 과거시험의 **응시 인원, 평균 점수, 답안과 풀이** 까지 공개할 예정이니 \n많은 응시와 관심 부탁드립니다!(´▽`ʃ♡ƪ)\n','[과거시험] 과거시험 점수를 알고싶어요',3),(7,'2023-03-29 17:26:00.556000','2023-03-29 17:27:14.935000','많은 분들의 요청에 따라 2023.03.29 17:30부터\n단어학습의 난이도별 경험치가 조정됩니다.\n\n단어학습의 초급은 한 문제당 10exp, 중급은 15exp, 고급은 20exp, 전체는 10exp로 부여되며,\n귀띔을 사용한 세모 문제는 5exp가 부여됩니다.\n\n문맥학습은 한 문제당 30exp로 변경되지 않습니다.\n\n2023.03.29 17:30 이전에 학습한 문제에는 반영되지 않으니 참고해주세요!','[학습] 학습별 경험치가 궁금해요!',3);
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
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

-- Dump completed on 2023-04-04 15:34:06
