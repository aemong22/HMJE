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
-- Table structure for table `past_question`
--

DROP TABLE IF EXISTS `past_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `past_question` (
  `past_question_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `past_answer` int DEFAULT NULL,
  `past_choice1` varchar(255) DEFAULT NULL,
  `past_choice2` varchar(255) DEFAULT NULL,
  `past_choice3` varchar(255) DEFAULT NULL,
  `past_choice4` varchar(255) DEFAULT NULL,
  `past_choice5` varchar(255) DEFAULT NULL,
  `past_question` varchar(255) DEFAULT NULL,
  `past_text` varchar(255) DEFAULT NULL,
  `past_test_id` bigint DEFAULT NULL,
  PRIMARY KEY (`past_question_id`),
  KEY `FK106vvdvirg47ok37wsm91menk` (`past_test_id`),
  CONSTRAINT `FK106vvdvirg47ok37wsm91menk` FOREIGN KEY (`past_test_id`) REFERENCES `past_test` (`past_test_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `past_question`
--

LOCK TABLES `past_question` WRITE;
/*!40000 ALTER TABLE `past_question` DISABLE KEYS */;
INSERT INTO `past_question` VALUES (1,'2023-03-20 16:00:12.578000','2023-03-20 16:00:12.578000',1,'열없다','끝없다','부질없다','하염없다','간데없다','\'없다\'의 본래 뜻이 유지되지 않는 것은?','',1),(2,'2023-03-20 16:00:12.578000','2023-03-20 16:00:12.578000',5,'눌언(訥言)','실언(失言)','독언(獨言)','망언(妄言)','허언(虛言)','<보기>의 굵은 단어와 의미상 가장 관계 깊은 것은?','그동안 진 신세를 고마워하며 **빈말**로라도 어서어서 돈 벌어서 은혜를 갚겠노라 하고 떠난 친구들이 있었다.',1),(3,'2023-03-20 16:00:12.578000','2023-03-20 16:00:12.578000',4,'부하 직원에게 일의 **갈무리**를 부탁했다. → 일을 처리하여 마무리함.','형이 음식을 갖고 계속 **가탈**을 부리고 있었다. → 이리저리 트집을 잡아 까다롭게 구는 일.','그는 성공할 **싹수**가 보인다. → 어떤 일이나 사람이 앞으로 잘될 것 같은 낌새나 징조.','그녀는 하는 말과 행동이 **무람없어서** 많은 이들의 사랑을 받고 있다. → 부끄러워하여 삼가고 조심하는 데가 있다.','그 사람은 **몽니**가 궂어서 상대하기가 어려운 인물이다. → 받고자 하는 대우를 받지 못할 때 내는 심술.','밑줄 친 고유어의 의미를 바르게 풀이하지 못한 것은?','',1),(4,'2023-03-20 16:00:12.578000','2023-03-20 16:00:12.578000',4,'그는 그 일에서 손을 뗐다.','친구들이 모두 오지는 않았다.','영희의 귀여운 동생이 보고 싶다.','동생은 나보다 게임을 더 좋아한다.','나는 강아지 한 마리와 토끼 한 마리를 키우고 있다.','의미상 두 가지 이상으로 해석할 수 있는 문장은?','',1),(5,'2023-03-20 16:00:12.578000','2023-03-20 16:00:12.578000',2,'맛-멋','갈다-걸다','낡다-늙다','막다-먹다','머리-마리','다음 단어들 중 의미적 유사성이 없는 것은?','',1),(6,'2023-03-20 16:00:12.578000','2023-03-20 16:00:12.578000',2,'지향(志向): 작정하거나 지정한 방향으로 나아가는 것을 이르는 말.','사족(蛇足): 쓸데없는 군짓을 하여 도리어 잘못되게 함을 이르는 말.','백미(白眉): 여럿 가운데에서 가장 뛰어난 사람이나 훌륭한 물건을 비유적으로 이르는 말.','치부(恥部): 남에게 드러내고 싶지 아니한 부끄러운 부분.','선풍(旋風): 돌발적으로 일어나 세상을 뒤흔드는 사건을 비유적으로 이르는 말.','밑줄 친 한자어의 사전적 뜻풀이로 옳지 않은 것은?','',1),(7,'2023-03-20 16:00:12.578000','2023-03-20 16:00:12.578000',5,'책상을 걸레로 **닦았다**. : 청소(淸掃)하다','자동차 전용 도로를 **닦았다**. : 건설(建設)하다','전통 무예를 **닦았다**. : 수련(修練)하다','건설 회사의 기반을 **닦았다**. : 준비(準備)하다','사람을 그렇게 **닦으면** 안 된다. : 회유(懷柔)하다.','고유어 \'닦다\'와 한자어의 대응으로 적절하지 않은 것은?','',1),(8,'2023-03-20 16:00:12.578000','2023-03-20 16:00:12.578000',4,'오늘 신문에 헌법 **전문**을 게재하였다.','어머니는 아들이 살아 있다는 **전문**을 들었다.','입시 **전문** 기관들마다 학습 전략을 쏟아 내고 있다.','고향 친구로부터 어머니께서 위독하시다는 **전문**을 받았다.','내가 온다는 **전문**을 듣고 동구에는 솔문을 세우고 길닦이까지 하였다.','\"우체국에 가서 급히 전문을 보냈다.\"에 사용된 \'전문\'과 같은 의미는?','',1),(9,'2023-03-20 16:00:12.578000','2023-03-20 16:00:12.578000',3,'‘무대에 서다’ → 공연에 참가하다.','‘귀에 딱지가 앉다’ → 같은 말을 여러 번 듣다.','‘눈물이 앞서다’ → 일을 함에 있어서 감정이 앞서다.','‘물로 보다’ → 사람을 하찮게 보거나 쉽게 생각하다.','‘비행기를 태우다’ → 남을 지나치게 칭찬하거나 높이 추어올려 주다.','다음 관용구의 의미가 적절하지 않은 것은?','',1),(10,'2023-03-20 16:00:12.578000','2023-03-20 16:00:12.578000',2,'잠이 막 들려던 **차**에 전화가 왔다.','급한 **마당**에 주저하고 말고가 없었다.','집에 가려던 **참**에 초등학교 동창을 만났다.','어제는 눈이 오는 **바람**에 길이 미끄러웠다.','난 집을 나온 후 편한 잠을 자 본 **적**이 없다.','굵은 단어 중, <보기>의 ㉠과 의미가 가장 유사한 것은?','그는 자기 앞가림도 못하는 ㉠**터**에 남 걱정을 한다.',1);
/*!40000 ALTER TABLE `past_question` ENABLE KEYS */;
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
