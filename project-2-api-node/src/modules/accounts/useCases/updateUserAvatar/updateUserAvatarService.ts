import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts//repositories/IUsersRepository";
import { deleteFile } from "@shared/file";

interface IRequestUpdateAvatar {
  id: string;
  avatarFile: string;
}
@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}
  async execute({ id, avatarFile }: IRequestUpdateAvatar): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }
    user.avatar = avatarFile;
    await this.usersRepository.create(user);
  }
}
