package org.jaea.onlinevideotutorials.domain;

public class FieldValidationRequest {
	
	private String field;
	private String value;
	private String userName;
	
	public String getField() {
		return field;
	}
	
	public void setField(String field) {
		this.field = field;
	}
	
	public String getValue() {
		return value;
	}
	
	public void setValue(String value) {
		this.value = value;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String toString(){
		return String.format("{field: %s, value: %s, userName: %s}", this.field, this.value, this.userName);  
	}
	

}
