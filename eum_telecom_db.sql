-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 26-07-30 14:22
-- 서버 버전: 10.4.32-MariaDB
-- PHP 버전: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `eum_telecom_db`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `subtitle` varchar(200) DEFAULT NULL,
  `image_url` varchar(191) NOT NULL,
  `link_url` varchar(191) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 테이블의 덤프 데이터 `banners`
--

INSERT INTO `banners` (`id`, `title`, `subtitle`, `image_url`, `link_url`, `sort_order`, `is_active`) VALUES
(1, '', '', '/images/1.png', NULL, 99, 1),
(2, '', '', '/images/2.png', NULL, 99, 1),
(3, '', '', '/images/3.png', NULL, 99, 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `carriers`
--

CREATE TABLE `carriers` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `img` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `companyinfo`
--

CREATE TABLE `companyinfo` (
  `id` int(11) NOT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `ceo_name` varchar(50) DEFAULT NULL,
  `business_reg_num` varchar(50) DEFAULT NULL,
  `mail_order_reg_num` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 테이블의 덤프 데이터 `companyinfo`
--

INSERT INTO `companyinfo` (`id`, `company_name`, `ceo_name`, `business_reg_num`, `mail_order_reg_num`, `address`) VALUES
(1, '주식회사 이음통신', '이채린', '738-81-00327', '제 2026-서울노원-0555 호', '서울특별시 노원구 화랑로 449-7, 4층 406호 (공릉동, 로우폴리스)');

-- --------------------------------------------------------

--
-- 테이블 구조 `consultation_requests`
--

CREATE TABLE `consultation_requests` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `ip` varchar(45) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 테이블의 덤프 데이터 `consultation_requests`
--

INSERT INTO `consultation_requests` (`id`, `name`, `phone`, `ip`, `created_at`) VALUES
(1, '박종광', '010-3970-1886', '::1', '2026-07-28 11:54:10.197'),
(4, '박종광', '155-1550-5050', '::1', '2026-07-29 13:19:45.025');

-- --------------------------------------------------------

--
-- 테이블 구조 `internet_plans`
--

CREATE TABLE `internet_plans` (
  `id` int(11) NOT NULL,
  `speed_name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `link` varchar(191) NOT NULL,
  `display_order` int(11) NOT NULL DEFAULT 0,
  `is_external` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 테이블의 덤프 데이터 `menu_items`
--

INSERT INTO `menu_items` (`id`, `name`, `link`, `display_order`, `is_external`) VALUES
(1, '홈', '/', 1, 0),
(2, '인터넷', '/internet', 2, 0),
(3, '휴대폰', 'https://youthnet.co.kr/bbs/phone.php', 3, 0),
(4, '가전렌탈', 'https://xn--sm2bx2zod011b.com/', 4, 1),
(5, '고객후기', '/reviews', 5, 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `permissionlevel`
--

CREATE TABLE `permissionlevel` (
  `level` int(11) NOT NULL,
  `level_name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 테이블의 덤프 데이터 `permissionlevel`
--

INSERT INTO `permissionlevel` (`level`, `level_name`) VALUES
(1, '일반사용자'),
(9, '최고관리자');

-- --------------------------------------------------------

--
-- 테이블 구조 `product_prices`
--

CREATE TABLE `product_prices` (
  `id` int(11) NOT NULL,
  `carrier_id` int(11) NOT NULL,
  `internet_plan_id` int(11) NOT NULL,
  `tv_plan_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `mobile_discount_price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `reviews`
--

CREATE TABLE `reviews` (
  `category` varchar(191) NOT NULL,
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `user_name` varchar(191) NOT NULL,
  `phone_last` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(191) DEFAULT NULL,
  `ip_address` varchar(191) NOT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `likes` int(11) NOT NULL DEFAULT 0,
  `admin_reply` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 테이블의 덤프 데이터 `reviews`
--

INSERT INTO `reviews` (`category`, `id`, `title`, `user_name`, `phone_last`, `password`, `content`, `image_url`, `ip_address`, `views`, `status`, `likes`, `admin_reply`, `created_at`) VALUES
('TV', 1, '인터넷 가입했습니당~', '장은수', '1234', '$2b$10$DuUAkXYfRB2Fz9M6qX8uSOBT.Xxjmw6qVr3cRuYI0CbFc0DOfz5cu', '좋아요', '/uploads/1783329114103_1.png', '::1', 0, 'pending', 0, NULL, '2026-07-06 09:11:54.114'),
('TV', 2, 'TV 가입했어요!ㅎㅎ', '장원순', '1234', '$2b$10$j5e7ggCm38PYIoIJypOvxuA77TJdo.iNtrfKSw8pLcdreqdoXDDrK', 'ㅎㅎ', '/uploads/1783936808304_rental.png', '::1', 0, 'pending', 0, NULL, '2026-07-13 10:00:08.310'),
('렌탈', 3, '렌탈 후기', '혜지야?', '1', '$2b$10$JE0TIWqDW4rsUXLk4I7Pe.8SIGYp4FutiHwF8J5TAQb.IAFh6K7LK', '123', '/uploads/1783936833937_rental.png', '::1', 0, 'pending', 0, NULL, '2026-07-13 10:00:33.940'),
('렌탈', 5, '렌탈 서비스 이용했습니다.', '박종광', '1234', '$2b$10$hJzBZD60zW96t4G0/OKNB.Ws7zKa5.FOuU2bI0TSq4U7svHK2KolS', '이웃님들! 여름 휴가계획은 어떠신가요?저는 올 여름엔 해외도 가보고 싶어서 여기저기 기웃기웃했는데요.환율과 유류할증이 꽤 올라서 고민이었거든요?다행히 마이리얼트립 할인코드\'>마이리얼트립 할인코드 덕분에 휴가계획 잘 짜고 있습니다~이웃님들도 저처럼 고민이실듯 하여 정보 공유드려요!​​마이리얼트립 할인코드2026년 5월 마이리얼트립 할인코드\'>마이리얼트립 할인코드 및 항공권 쿠폰 총정리하고 있습니다. 이 페이지에서는 사용가능한 마이리얼트립 할인쿠폰, 항공권 프로모션 및 카드할인 혜택 모두 실시간 최신 업데이트 하고 있습니다.마이리얼트립 할인코드가 매일 업데이트 되고 있는걸 이제서 알았어요!원래도 여행 계획 준비할때 마이리얼트립이 저렴한 편이라 여기서 알아보곤 했는데요.할인코드와 항공권 쿠폰까지 총 정리되어 있어서 보기 편리하더라고요!​매일 마이리얼트립 할인코드가 업데이트 되고 있었어요.항공권 쿠폰도 총 정리되어 있어서 보기 편하고요.​​5월 마지막주라서 거마감된 할인코드가 많았지만,곧 6월 할인쿠폰이 업데이트 될거라서 기대하고 있습니다!​​저는 2~3주 전에 알아보고 있던터라 항공권프로모션 혜택 받고 예약할수 있었거든요.진에어, 에어프레미아, 스칸디나비아항공, 케세이퍼시픽 등 인기 노선들에 대한 항공권 티켓을 저렴하게 구매할수 있었어요.예매 기한이 있었으니 6월 할인 기다리셔도 되실듯~​​지금도 실시간 항공권 최저가 확인이 가능해서 조금 전에도 보고 왔거든요!럭키글라이드는 항공권 가격을 기준으로 가장 저렴한 시기를 찾을 수 있는 가격 중심 검색서비스인데요.덕분에 실시간 항공권 최저가 기간을 한눈에 알아볼수 있었네요.​​짜잔~ 일단 지역 선정 월별 선택도 중요한데요.일단 최저가로 올라온 기본 항공권이예요.​​오사카의 경우 7월 12일부터 2박3일 항공권이 저렴했는데요.​​일자별로 가격을 그래프로 볼수 있어서 가장 저렴한날 출발하면 되겠더라는!!! 완전 최고의 럴키글라이드입니다!​​왕복항공권을 가장 저렴하게 찾아주기때문에 진짜 진짜 최고로 좋더군요.​​아무래도 7월이면 준성수기라서 비쌀 듯한데, 이정도 왕복이면 가격 착하죠?마이리얼트립 할인코드\'>마이리얼트립 할인코드 링크에서 자주 확인하면 최저가로 여행가기 딱 좋을것 같아요.​마이리얼트립 할인코드직접 가셔서 확인 하셔도 됩니다!​​인기 숙소도 한눈에 보여서 오사카 당첨!​​외에도 다양한 여행지 실시간 항공권 최저가로 확인되는 마이리얼트립 자주 이용해보세요.​​숙박세일페스타 할인쿠폰도 실시간 업데이트 되고 있더라고요.5월은 마감되서~ 6월 숙박세일페스타 기다리고 있습니다!​​​해외항공권의 경우 카드할인도 있더라고요.할인프로모션 혜택 많아서 항공권도 그냥 예약하지마세요~!꼭 할인 받고 예약하시길!​​일본 오사카로 정하기로 하니, 마이리얼트립 덕분에 여행 일정이 쉽게 잡히네요.일본 베스트셀러 특가, 일본 미식 프로모션, 유니버셜 스튜디오 등등 혜택이 많더라고요.​​유니버셜 스튜디오 재팸은 필수코스잖아요?일일 입장권부터, 익스프레스 패스부터, 간사이 소이패스까지 다양한 패키지 많습니다~덕분에 여행이 쉬워질듯!​​오사카 시내패스도 사실 좀 복잡한데요.한눈에 알아보기 쉽게 되어 있어서 편리해요.일본여행은 다 전철이용이라서 알아두면 편하죠!​오사카 근교 여행 패스 역시 총정리 되어 있었어요.이렇게 편해도 되나 싶을정도~여름휴가계획 준비하고 계시다면 복잡하게 여기저기 알아보지 마시고마이리얼트립 할인코드 이용해서 여행 준비해보세요.최저가로 여행준비하기 딱 좋더라고요~​2026년 5월 마이리얼트립 할인코드\'>마이리얼트립 할인코드 및 항공권 쿠폰 총정리하고 있습니다. 이 페이지에서는 사용가능한 마이리얼트립 할인쿠폰, 항공권 프로모션 및 카드할인 혜택 모두 실시간 최신 업데이트 하고 있습니다.마이리얼트립 할인코드\'>마이리얼트립 할인코드 꼭 확인하고 여행준비하세요~그럼 또 좋은 정보 공유드릴게요~​​\r\n\r\n', '/uploads/1784977128868_rental.png', '::1', 0, 'pending', 0, NULL, '2026-07-25 10:58:48.884'),
('인터넷', 6, '리뷰입니다.', '관리자', '0000', '$2b$10$EWai/7EQtp7AMjM9F0JLrOq9dPh03sK/yYsVGHSjn/gouanlbFy5W', '안녕하세용', '/uploads/1785329877480_dltvls333-maker.github.io_myPortfolio__(1).png', '::1', 0, 'pending', 0, NULL, '2026-07-29 12:57:57.569');

-- --------------------------------------------------------

--
-- 테이블 구조 `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `logo_name` varchar(255) NOT NULL,
  `logo_path` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 테이블의 덤프 데이터 `site_settings`
--

INSERT INTO `site_settings` (`id`, `logo_name`, `logo_path`, `updated_at`) VALUES
(1, 'logo.png', '/images/logo.png', '2026-07-06 09:09:58');

-- --------------------------------------------------------

--
-- 테이블 구조 `tv_plans`
--

CREATE TABLE `tv_plans` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'USER',
  `level` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 테이블의 덤프 데이터 `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `name`, `role`, `level`) VALUES
(2, 'admin', 'dldmaxhdtls!', '최고관리자', 'ADMIN', 9);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `carriers`
--
ALTER TABLE `carriers`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `companyinfo`
--
ALTER TABLE `companyinfo`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `consultation_requests`
--
ALTER TABLE `consultation_requests`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `internet_plans`
--
ALTER TABLE `internet_plans`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `permissionlevel`
--
ALTER TABLE `permissionlevel`
  ADD PRIMARY KEY (`level`);

--
-- 테이블의 인덱스 `product_prices`
--
ALTER TABLE `product_prices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_prices_carrier_id_fkey` (`carrier_id`),
  ADD KEY `product_prices_internet_plan_id_fkey` (`internet_plan_id`),
  ADD KEY `product_prices_tv_plan_id_fkey` (`tv_plan_id`);

--
-- 테이블의 인덱스 `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tv_plans`
--
ALTER TABLE `tv_plans`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email_key` (`email`),
  ADD KEY `user_level_fkey` (`level`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 테이블의 AUTO_INCREMENT `carriers`
--
ALTER TABLE `carriers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `companyinfo`
--
ALTER TABLE `companyinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 테이블의 AUTO_INCREMENT `consultation_requests`
--
ALTER TABLE `consultation_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 테이블의 AUTO_INCREMENT `internet_plans`
--
ALTER TABLE `internet_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 테이블의 AUTO_INCREMENT `product_prices`
--
ALTER TABLE `product_prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 테이블의 AUTO_INCREMENT `tv_plans`
--
ALTER TABLE `tv_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `product_prices`
--
ALTER TABLE `product_prices`
  ADD CONSTRAINT `product_prices_carrier_id_fkey` FOREIGN KEY (`carrier_id`) REFERENCES `carriers` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `product_prices_internet_plan_id_fkey` FOREIGN KEY (`internet_plan_id`) REFERENCES `internet_plans` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `product_prices_tv_plan_id_fkey` FOREIGN KEY (`tv_plan_id`) REFERENCES `tv_plans` (`id`) ON UPDATE CASCADE;

--
-- 테이블의 제약사항 `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_level_fkey` FOREIGN KEY (`level`) REFERENCES `permissionlevel` (`level`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
