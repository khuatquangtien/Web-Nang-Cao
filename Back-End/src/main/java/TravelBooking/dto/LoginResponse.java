package TravelBooking.dto;

public class LoginResponse {
    private String token;
    private String username;
    private String message;
    private Long id;

    // Constructor để tạo nhanh
    public LoginResponse(String token, String username, String message, Long id) {
        this.token = token;
        this.username = username;
        this.message = message;
        this.id = id;
    }

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	// Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}