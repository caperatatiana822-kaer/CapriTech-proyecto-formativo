ALTER TABLE `feeding`
  ADD COLUMN `active` tinyint(1) NOT NULL DEFAULT '1';

ALTER TABLE `mortality`
  ADD COLUMN `active` tinyint(1) NOT NULL DEFAULT '1';
