import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
  }

  async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
    const { username, email, password } = user;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) return 'Email Taken!';

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.create(
      username,
      email,
      hashedPassword,
    );
    return this.userService._getUserDetails(newUser);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );
    if (!doesPasswordMatch) return null;

    return this.userService._getUserDetails(user);
  }

  async login(
    existingUser: ExistingUserDTO,
  ): Promise<{ token: string; user: UserDetails } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);
    if (!user) return null;

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt, user };
  }
}
