Feature: Login

  Scenario: A valid user
    Given I send a POST request to "/api/auth/login" with body:
    """
    {
      "email": "test@test.test",
      "password": "123qweQWE!"
    }
    """
    Then the response status code should be 200
