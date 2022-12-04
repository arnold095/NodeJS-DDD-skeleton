Feature: health check
  Scenario: health check
    Given I send a GET request to "/api/v1/health-check"
    Then the response status code should be 200
    And the response content should be ok
