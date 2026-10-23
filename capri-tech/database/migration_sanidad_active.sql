ALTER TABLE `vaccination`
  ADD COLUMN `active` tinyint(1) NOT NULL DEFAULT '1';

ALTER TABLE `mastitis`
  ADD COLUMN `active` tinyint(1) NOT NULL DEFAULT '1';

ALTER TABLE `famacha`
  ADD COLUMN `active` tinyint(1) NOT NULL DEFAULT '1';
