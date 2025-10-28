import { Page } from '@playwright/test';
import data from '../data/data.json';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(data.login);
  }

  // Locators for login component
  loginEmail() { return this.page.locator('#UserName'); }
  passwordField() { return this.page.locator('#Password'); }
  loginButton() { return this.page.getByRole('button', { name: 'Log in' }); }
  
  // Methods for login
  async enterEmail(email: string) {
    await this.loginEmail().fill(email);
  }
  
  async enterPassword(password: string) {
    await this.passwordField().fill(password);
  }
  
  async clickLogin() {
    await this.loginButton().click();
  }
  
  // Logs user in with supplied email and password and confirms root URL returned
  async login(email: string, pass: string) {
    await this.enterEmail(email);
    await this.enterPassword(pass);
    await this.clickLogin();
    await this.page.waitForURL(data.app);
  }
}
