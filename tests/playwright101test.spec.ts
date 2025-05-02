import { expect, test } from '@playwright/test';

test.describe('Playwright 101 Assignment Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/selenium-playground');
  });

  test('Test Scenario 1', async ({ page }) => {
    
    await test.step('Open LambdaTest’s Selenium Playground', async () => {
      await expect(page).toHaveURL('https://www.lambdatest.com/selenium-playground/');
    });
    await test.step('Click on “Simple Form Demo”', async () => {
      const simpleFormDemo = page.locator('//a[text()="Simple Form Demo"]');
      await simpleFormDemo.scrollIntoViewIfNeeded();
      await simpleFormDemo.click();
    });
    await test.step('Validate that the URL contains “simple-form-demo”', async () => {
      const currentUrl = page.url(); // Get the current URL
      expect(currentUrl).toContain('simple-form-demo'); // Assert that it contains the string
    });
    await test.step('Enter the variable value in the “Enter Message” text box', async () => {
      const messageInput = page.getByPlaceholder('Please enter your Message');
      const message = "Welcome to LambdaTest";
      await messageInput.fill(message);
    });
    await test.step('Click on “Get Checked Value”', async () => {
      const getCheckedValueButton = page.locator('#showInput');
      await getCheckedValueButton.click();
      await page.waitForTimeout(200);
    });
    await test.step('Validate the text message is displayed in the right-hand panel under the “Your Message:” section', async () => {
      await page.waitForSelector('//p[@id="message"]', { state: 'visible' }); // Ensure the element is visible
      const displayedMsg = await page.locator('//p[@id="message"]').textContent();
      console.log('Displayed Message:', displayedMsg?.trim()); // Log the actual text
      expect(displayedMsg?.trim()).toBe("Welcome to LambdaTest"); // Assert the text
    });
    await page.close();
  });


  test('Test Scenario 2', async ({ page }) => {
    await test.step('Open LambdaTest’s Selenium Playground', async () => {
      await expect(page).toHaveURL('https://www.lambdatest.com/selenium-playground/');
    });
    await test.step('click on “Drag & Drop Sliders”', async () => {
      const simpleFormDemo = page.locator('//a[text()="Drag & Drop Sliders"]');
      await simpleFormDemo.scrollIntoViewIfNeeded();
      await simpleFormDemo.click();
    })
    await test.step('Select the slider “Default value 15” and drag the bar to make it 95', async () => {
      const slider15 = page.locator('input[value="15"]');
      const sliderBoundingBox = await slider15.boundingBox();
      if (sliderBoundingBox) {
        const sliderStartX = sliderBoundingBox.x + sliderBoundingBox.width / 2; // Start position of the slider
        const sliderStartY = sliderBoundingBox.y + sliderBoundingBox.height / 2;
        await page.mouse.move(sliderStartX, sliderStartY);
        await page.mouse.down();
        await page.mouse.move(sliderStartX + 215, sliderStartY); // Drag the slider to the right
        await page.mouse.up();
      }
      await page.waitForTimeout(200);
    })
    await test.step('validating whether the range value shows 95', async () => {
      const expectedRange = await page.locator('#slider3 > div > output').textContent();
      const actualRange = '95';
      expect(expectedRange?.trim()).toMatch(actualRange);
    })
    await page.close();
  })


  test('Test Scenario 3', async ({ page }) => {
    await test.step('Open LambdaTest’s Selenium Playground', async () => {
      await expect(page).toHaveURL('https://www.lambdatest.com/selenium-playground/');
    });
    await test.step('Click on ““Input Form Submit”', async () => {
      const simpleFormDemo = page.locator('//a[text()="Input Form Submit"]');
      await simpleFormDemo.scrollIntoViewIfNeeded();
      await simpleFormDemo.click();
    });
    await test.step('Click “Submit” without filling in any information in the form',async()=>{
      const submitButton = page.locator('//button[text()="Submit"]');
      await submitButton.click();
    });

    await test.step('Assert “Please fill in the fields” error message', async()=>{
      const nameElement = page.locator("//div[@class='form-group w-4/12 smtablet:w-full text-section pr-20 smtablet:pr-0']/input[@type='text']");
      await nameElement.focus();
      await nameElement.evaluate((el) => el.blur());
      const errorMessage = await nameElement.evaluate((el) => (el as HTMLInputElement).validationMessage);
      expect(errorMessage).toBe('Please fill out this field.');
    });

    await test.step('Fill in Name, Email, and other fields', async()=>{
      await page.locator('//input[@name="name"]').fill('John Doe');
      await page.locator("//div[@class='form-group w-4/12 smtablet:w-full text-section pr-20 smtablet:pr-0']/input[@type='email']").fill("Test1234@gmail.com");
      await page.locator("//div[@class='form-group w-4/12 smtablet:w-full']/input[@type='password']").fill("Test@1234");
      await page.locator("//input[@id='company']").fill("LambdaTest organization");
      await page.locator("//input[@id='websitename']").fill("www.lambdaTest.com");
      await page.locator("//input[@id='inputCity']").fill("Pune");
      await page.locator("//input[@id='inputAddress1']").fill("ABC tech park");
      await page.locator("//input[@id='inputAddress2']").fill("near shivaji nagar");
      await page.locator("//input[@id='inputState']").fill("Maharashtra");
      await page.locator("//input[@id='inputZip']").fill("000234");
    })

    await test.step('From the Country drop-down, select “United States” using the text property', async()=>{
      const countryDropdown = page.locator("//select[@name='country']");
      await countryDropdown.selectOption({ label: 'United States' });
    })
    await test.step('click “Submit”', async()=>{
      const submitButton = page.locator('//button[text()="Submit"]');
      await submitButton.click();
    })
    await test.step('Once submitted, validate the success message “Thanks for contacting us, we will get back to you shortly.” on the screen', async () => {
      const successElement = page.locator("//p[text()='Thanks for contacting us, we will get back to you shortly.']");
      const expectedMsg = await successElement.textContent();
      const actualMsg = "Thanks for contacting us, we will get back to you shortly.";
      expect(expectedMsg?.trim()).toBe(actualMsg);
    });
  })
  


});