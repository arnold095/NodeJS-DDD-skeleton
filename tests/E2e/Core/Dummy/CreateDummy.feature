Feature: create dummy
  Scenario: create dummy
    Given I send a PUT request to "/api/v1/dummies/776e25f9-0179-468e-914d-d158256a3c96" with body:
    """
    {
      "name": "dummy"
    }
    """
    Then the response status code should be 204
    And the response should be empty
