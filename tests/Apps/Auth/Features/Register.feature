Feature: Register

  Scenario: Register a new user
    Given I send a POST request to "/api/auth/register" with body:
    """
    {
      "id": "20143e2d-7760-4a97-ad02-fa45cadaefdd",
      "firstName": "test",
      "lastName": "test",
      "email": "test1@test.com",
      "password": "123bA01!"
    }
    """
    Then the response status code should be 201
