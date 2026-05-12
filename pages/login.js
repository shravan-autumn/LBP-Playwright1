import { expect } from '@playwright/test';
import { generateUser } from '../pages/utils.js';


exports.Login = class Login {

    constructor(page) {
        this.page = page;
        this.accountLink = page.locator('[data-account-link-test-id]');
        this.createAccountLink = page.locator('[data-create-account-link-test-id]');
        this.emailTextField = page.locator('[data-login-email-input-test-id]');
        this.passwordTextFiled = page.locator('[data-login-password-input-test-id]');
        this.loginButton = page.locator('[data-login-submit-btn-test-id]');
        this.firstName = page.locator('[data-register-first-name-input-test-id]');
        this.lastName = page.locator('[data-register-last-name-input-test-id]');
        this.email = page.locator('[data-register-email-input-test-id]');
        this.phone = page.locator('[data-register-phone-input-test-id]');
        this.password = page.locator('[data-register-password-input-test-id]');
        this.confirmPassword = page.locator('[data-register-confirm-password-input-test-id]');
        this.registerButton = page.locator('[data-register-submit-btn-test-id]');
        this.consentCheckbox = page.locator('[class="input-full social_btn_enable_mandatory"]');
        this.accountHeading = page.locator('[class="customer__title"]');
        this.logoutButton = page.locator('//a[@href="/account/logout"]');

        // store user data
        this.user = null;
    }

    async registerUser() {
        await this.accountLink.click();
        await this.createAccountLink.click();
        await this.firstName.waitFor();
        this.user = generateUser();
        await this.firstName.fill(this.user.firstName);
        await this.lastName.fill(this.user.lastName);
        await this.email.fill(this.user.email);
        await this.phone.fill(this.user.phone);
        await this.password.fill(this.user.password);
        await this.confirmPassword.fill(this.user.password);
        await this.consentCheckbox.click();
        await this.registerButton.click();
        await this.accountLink.click();
    }
    async logout() {
        await this.logoutButton.click();
    }


    async login() {
        await this.accountLink.click();
        await this.emailTextField.fill(this.user.email);
        await this.passwordTextFiled.fill(this.user.password);
        await this.loginButton.click();
        await this.accountLink.click();
    }
    async loginNavigation() {
        await this.accountLink.click();
    }

}