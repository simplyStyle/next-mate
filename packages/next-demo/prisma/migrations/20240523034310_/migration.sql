-- RenameIndex
ALTER TABLE `Authorized` RENAME INDEX `Authorized_userId_fkey` TO `Authorized_userId_idx`;

-- RenameIndex
ALTER TABLE `Session` RENAME INDEX `Session_userId_fkey` TO `Session_userId_idx`;
