-- Migration: Create newsletter_subscribers table
-- Date: 2026-02-06

CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `name` varchar(255),
  `interests` varchar(255),
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add unique constraint on email to prevent duplicate subscriptions
CREATE UNIQUE INDEX `newsletter_subscribers_email_idx` ON `newsletter_subscribers` (`email`);