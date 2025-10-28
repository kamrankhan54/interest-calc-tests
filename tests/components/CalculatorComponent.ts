import { Page, expect } from '@playwright/test';
import data from '../data/data.json';

export class CalculatorComponent {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(data.app);
  }

  // Locators 
  durationOption(duration: string) { return this.page.locator('#durationList .list-group-item', { hasText: duration }); }
  mandatoryCheckbox() { return this.page.locator('#gridCheck1'); }
  calculateButton() { return this.page.getByRole('button', { name: 'Calculate' }); }
  homeLoginButton() { return this.page.getByRole('button', { name: 'Login' }); }
  welcomeText() { return this.page.locator('text=Welcome to Ten10 Technical Test Website'); }
  interestRateDropdown() { return this.page.locator('#dropdownMenuButton'); }
  interestRateOption(rate: string) { return this.page.locator(`.dropdown-menu[aria-labelledby="dropdownMenuButton"] .dropdown-item`, { hasText: rate }); }
  
  // Methods for calculating interest component 
  async clickLoginIfWelcomeVisible() {
    if (await this.welcomeText().isVisible()) {
      await this.homeLoginButton().click();
    }
  }
  
  async clickHomeLogin() {
    await this.homeLoginButton().click();
  }
  
  async checkMandatory() {
    await this.mandatoryCheckbox().check();
  }

  async setPrincipal(value: number) {
    await this.page.locator('#customRange1').evaluate((slider: HTMLInputElement, v) => {
      slider.value = String(v);
      slider.dispatchEvent(new Event('input', { bubbles: true }));
    }, value);
  }

  async selectInterestRate(rate: string) {
    await this.page.locator('#dropdownMenuButton').click();

    const rateCheckbox = this.page.locator(`.dropdown-menu.show input[value="${rate}"]`);
    await rateCheckbox.check();
    
    await expect(rateCheckbox).toBeChecked();
    await this.page.locator('body').click({ position: { x: 0, y: 0 } });
  }

  async selectDuration(duration: string) {
    await this.durationOption(duration).click();
  }
  
  async clickCalculate() {
    await this.calculateButton().click();
  }

  interestAmount() {
    return this.page.locator('#interestAmount');
  }
  
  async expectInterest(amount: number) {
    const text = await this.interestAmount().textContent();
    const value = Number(text?.match(/([\d,.]+)/)?.[1].replace(/,/g, ''));
    expect(value).toBeCloseTo(amount, 2);
  }

  totalAmount() {
    return this.page.locator('#totalAmount');
  }

  async expectTotalAmount(expectedValue: number) {
    const text = await this.totalAmount().textContent();
    const actualValue = Number(text?.match(/([\d,.]+)/)?.[1].replace(/,/g, ''));
    expect(actualValue).toBeCloseTo(expectedValue, 2);
  }


  // Calculates interest and validates results based on principal, rate and duration inputs
  async calculateInterest(principal: number, rate: string, duration: string, expectedInterest: number, expectedTotal: number) {

    await this.setPrincipal(principal);
    await this.selectInterestRate(rate);
    await this.selectDuration(duration);
    await this.checkMandatory();
    await expect(this.mandatoryCheckbox()).toBeChecked();

    await this.clickCalculate();
    await this.expectInterest(expectedInterest);
    await this.expectTotalAmount(expectedTotal);
  }
}
