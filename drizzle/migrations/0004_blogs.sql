-- Blog posts table for admin CMS
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text,
  `content` longtext,
  `category` varchar(100) DEFAULT 'General',
  `author` varchar(255) DEFAULT 'Nawins Education',
  `readTime` varchar(50) DEFAULT '5 min read',
  `featured` boolean DEFAULT false,
  `published` boolean DEFAULT true,
  `imageUrl` varchar(500),
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_unique` (`slug`)
);

-- Consultations table (from Google Calendar bookings)
CREATE TABLE IF NOT EXISTS `consultations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20),
  `preferredDate` date,
  `preferredTime` varchar(50),
  `destination` varchar(100),
  `qualification` varchar(100),
  `ieltsScore` varchar(20),
  `budget` varchar(100),
  `intake` varchar(50),
  `calendarEventId` varchar(255),
  `status` enum('pending','confirmed','completed','cancelled') DEFAULT 'pending',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- Scholarships table (Phase 2)
CREATE TABLE IF NOT EXISTS `scholarships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `country` varchar(100) NOT NULL,
  `university` varchar(255),
  `amount` varchar(100),
  `eligibility` text,
  `deadline` date,
  `applyUrl` varchar(500),
  `active` boolean DEFAULT true,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
