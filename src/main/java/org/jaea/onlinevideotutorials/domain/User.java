
package org.jaea.onlinevideotutorials.domain;


import java.util.Date;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.CascadeType;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */


@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public  class User implements Comparable<User>{
    
    
    public static final String TUTOR_TYPE = "tutor";
    public static final String STUDENT_TYPE = "student";
    
    @JsonIgnore
    @Id
    @GeneratedValue
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP) 
    @CreatedDate
    private Date createdAt;
    
    @Column(nullable = false)
    protected String name;
    
    @Column(nullable = false)
    protected String surname;
    
     @Column(unique = true, nullable = false)
    protected String email;

    @Column(unique = true, nullable = false)
    protected String userName;
    
    @Column(nullable = false)
    protected String userType;
    
    @Column(nullable = false)
    private String password;
    
    @OneToOne(cascade=CascadeType.PERSIST, orphanRemoval=true, optional=true)
    private UserFile userImage;
   

    protected User(){}
    
    public User(String userName, String userType, String name){
        this.userName = userName;
        this.userType = userType;
        this.name = name;
    }

     public User(String userName, String userType, String name, String password){
        this.userName = userName;
        this.userType = userType;
        this.name = name;
        this.password = password;
    }


    public User(String userName, String userType, String name, String surname, String email, String password){
        this.userName = userName;
        this.userType = userType;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.email = email;
    }
    
    public User(User user){
        this.userName = user.getUserName();
        this.userType = user.getUserType();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.email = user.getEmail();
        this.password = user.password;
    }
    
    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getSurname(){
        return this.surname;
    }
    
    public String getUserName() {
        return this.userName;
    }

    public String getUserType() {
        return this.userType;
    }

    public String getEmail(){
        return this.email;
    }
    
    public UserFile getUserImage(){
    	return this.userImage;
    }
    
    public void setName(String name) {
		this.name = name;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public void setUserImage(UserFile userImage){
    	this.userImage = userImage;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public void setPasswordFromOtherUser(User user){
    	if (!user.password.equals("")){
    		this.password = user.password;
    	}
    }
    
    @JsonIgnore
    public boolean isATutor(){
        return this.userType.equals(TUTOR_TYPE);
    }

    @JsonIgnore
    public boolean isAStudent(){
        return this.userType.equals(STUDENT_TYPE);
    }

    public boolean comparePassword(String password){
        return this.password.equals(password);
    }

    public boolean comparePassword(User user){
        return this.password.equals(user.password);
    }
    
     @Override
    public int compareTo(User user) {
      if ((user == null) || !(user instanceof User)) {
            return 1;
    }
       return this.userName.compareTo(user.getUserName());
    }
    
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.id == null) ? 0 : this.id.hashCode());
        result = prime * result + ((this.userName == null) ? 0 : this.userName.hashCode());
        return result;
    }
    
    
    @Override
    public boolean equals(Object obj) {
        
        if (this == obj) {
            return true;
    }
    if ((obj == null) || !(obj instanceof User)) {
            return false;
    }
    User other = (User) obj;
    boolean eq = this.userName.equals(other.getUserName());

    return eq;
    }

    public String toString(){
        return "{userName: " + this.userName + ",userType: " + this.userType + ",name: " + this.name + ",surname: " + this.surname +  ",email: " + this.email + "}";
    }

    
    
}
