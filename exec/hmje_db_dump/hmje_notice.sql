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
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `notice_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`notice_id`),
  KEY `FKcvf4mh5se36inrxn7xlh2brfv` (`user_id`),
  CONSTRAINT `FKcvf4mh5se36inrxn7xlh2brfv` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (2,'2023-03-28 09:27:50.312000','2023-03-29 17:28:29.003000','[안내] 이용 제한 조치/제재 및 이의 제기 관련 업무 안내\n\n안녕하세요, 모두를 위한 단어학습 서비스 홍민정음 운영진입니다.\n\n홍민정음 서비스의 운영정책을 안내드리겠습니다.\n\n1.제재 정책\n - 다른 회원들에게 혼란을 줄 수 있는 별명 사용\n - **시스템 (버그) 사용 및 비정상적인 플레이 (어뷰징) 행위**\n - 운영 업무 방해\n - 게임아이디 도용 및 해킹\n 등 서비스 이용에 방해가 되거나 악영향을 끼칠 수 있는 모든 행위를 제재합니다.\n\n2.제재는 회원 탈퇴로 이루어지며, 본인에게 사유를 안내해드리지 않습니다.\n 더해서, 같은 휴대폰 번호로 다시 회원가입하실 수 없습니다.\n\n3.제재 사유에 대한 문의와 처리에 대해서는\n 고객 지원 이메일( **[hmjemalrang@gmail.com](mailto:hmjemalrang@gmail.com)** )로 문의 주시기 바랍니다.\n\n4.모든 업무는 영업일(시간)기준 약 1~3일 내로 처리하고 있습니다.\n - **접수된 순서대로 처리**하며 경우에 따라 **처리가 늦어질 수** 있습니다.\n - **동일한 내용으로 여러 번 신고**하실 경우 **처리 지연의 원인**이 됩니다.\n - 고객지원으로 문의를 보내셨으나, **7일이 지나도 답변을 받지 못하신 경우**\n  내부 오류 등으로 누락이 된 것이기 때문에 재문의를 해주시기 바랍니다.','[안내] 이용 제한 조치/제재 및 이의 제기 관련 업무 안내',3),(3,'2023-03-28 09:33:40.324000','2023-03-29 17:29:10.074000','안녕하세요, 모두를 위한 단어학습 서비스 홍민정음 운영진입니다. \n\n**[ 홍민정음 서비스 개발시간 ]**\n\n1교시 : 오전 9:00 ~ 오전 10:00\n\n2교시 : 오후 12:00 ~ 오후 13:30\n\n3교시 : 오후 17:00 ~ 오후 18:00\n\n4교시 : 오후 22:00 ~ 오전 01:00\n\n서비스 업데이트와 개발일정으로 인해 **[ 홍민정음 서비스 개발시간 ]** 에는 \n서버 재부팅 등의 이유로 서비스 이용이 불편하실 수 있음을 알려드립니다.','[공지사항] 홍민정음 이용가능 시간 안내',3),(4,'2023-03-28 09:33:53.732000','2023-04-03 09:48:14.454000','안녕하세요, 모두를 위한 단어학습 서비스 홍민정음 운영진입니다.\n\n2023년 3월 28일부터 홍민정음 서비스를 이용해 보실 수 있습니다!\n\n서비스 이용 중 불편했던 점 혹은 건의 사항이 있으신 분은\n\n**[hmjemalrang@gmail.com](mailto:hmjemalrang@gmail.com)** 이나 **[홍민정음 신문고](https://forms.gle/3ZMy86WSWmjhZJfB9)** 로 제보해주세요!\n\n제보하신 분들 중 추첨을 통해서 소정의 기프티콘을 보내드리도록 하겠습니다 :)\n\n좋은 서비스를 위해 항상 노력하겠습니다.\n\n**[이동하기](https://forms.gle/3ZMy86WSWmjhZJfB9)**\n\n','[공지사항] ?오류 제보왕을 찾아라!‼?',3),(6,'2023-03-30 16:03:08.858000','2023-03-30 16:03:08.858000','안녕하세요, 모두를 위한 단어학습 서비스 홍민정음 운영진입니다. \n\n **\'단어사전\'** 서비스 개발이 완료 되었습니다.\n단어학습에 도움이 되시길 바랍니다.\n\n좋은 서비스를 위해 노력하겠습니다. 많은 이용 부탁드려요!','[안내] 단어사전 이용가능 안내',3),(7,'2023-03-30 17:52:22.805000','2023-03-30 17:55:45.962000','안녕하세요, 모두를 위한 단어학습 서비스 홍민정음 운영진입니다. \n\n서비스 출시 이후 개선(업데이트)된 정보를 공유드립니다.\n\n\n# **2023.03.28 ~ 2023.03.30 개선(업데이트)정보**\n\n**[단어학습]**\n\n-틀렸던 문제 표시\n\n-단어 난이도 추가\n\n-단어 난이도에 따른 경험치 차등 부여\n\n-학습 결과 페이지에서 `오답노트`로의 이동 버튼 추가\n\n**[문맥학습]**\n\n-학습 결과 페이지에서 `도감`으로의 이동 버튼 추가\n\n**[도감]**\n\n-도감 레어카드 표시 추가\n\n-획득 / 미획득 필터 추가\n\n**[메인페이지]**\n\n-메인기능(학습관리, 문맥도감, 오답노트)로의 이동 버튼 추가\n\n-학습 정보에 따른 캐릭터 표정 추가\n\n**[마이페이지]**\n\n-학습 관리(학습 시간, 학습 단어, 학습비교, 뱃지)로의 이동 버튼 추가\n\n-정보 수정 기능 추가\n\n-등급(레벨)별 캐릭터 요소 추가\n\n**[단어 사전]**\n\n-사전 기능 추가\n\n**[그 외]**\n\n-로딩페이지 변경\n\n\n\n좋은 서비스를 위해 노력하겠습니다.','[개선내역] 홍민정음 ver1.1 개선내역입니다',3),(8,'2023-03-31 15:07:10.086000','2023-04-03 09:46:27.765000','안녕하세요, 모두를 위한 단어학습 서비스 홍민정음 운영진입니다.\n\n**[홍민정음 만족도 설문조사](https://forms.gle/s9eCTfKrhGVktGwu8)** 를 해주신 분들께는 추첨을 통해서 소정의 기프티콘을 보내드리도록 하겠습니다 :)\n\n좋은 서비스를 위해 항상 노력하겠습니다.\n\n**[이동하기](https://forms.gle/s9eCTfKrhGVktGwu8)**','[공지사항] ?만족도 설문조사하고, 기프티콘 팡팡!?',3),(9,'2023-04-03 10:46:19.786000','2023-04-03 10:46:19.786000','안녕하세요 모두를 위한 단어학습 서비스 홍민정음 운영진입니다.\n\n베타 서비스 진행중인 관계로 과거시험 기간이\n2023.04.04(화)까지로 연장됨을 알려드립니다.\n\n많은 이용 부탁드려요(/≧▽≦)/','[공지사항] 과거시험 기간 연장 안내',3);
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
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

-- Dump completed on 2023-04-04 15:33:52
