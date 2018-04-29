package org.jaea.onlinevideotutorials.controllers;



import org.jaea.onlinevideotutorials.domain.RequestUser;
import org.jaea.onlinevideotutorials.domain.FieldValidationRequest;
import org.jaea.onlinevideotutorials.domain.User;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;
import org.jaea.onlinevideotutorials.repositories.ParticipantSessionRepository;
import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.verification.VerificationMode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@RunWith(SpringRunner.class)
@WebMvcTest(value={UserController.class})
public class UserControllerTest {
    private final Logger log = LoggerFactory.getLogger(UserController.class);
  
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private UserSessionsRegistry usersRegistry;
    @MockBean
    private ParticipantSessionRepository userRepository;

    static ParticipantSession existingUser_q;
    static String userName_q;
    static String password_q;
    static String email_q;
    static String genericUserName = "user";

    static boolean initialize = false;
    
    @Test
    public void prueba(){
        this.log.info("Test de prueba");
    }
    
    
    @Before
    public void setUp() { //public static void setUp() {

        if (!initialize){
            userName_q = "angela.gossow";
            password_q = ParticipantSessionDispenser.DEFAULT_PASSWORD_TEST;
            existingUser_q = ParticipantSessionDispenser.getStudentParticipant(userName_q);
           // this.mockMvc = webAppContextSetup(webApplicationContext).build();
            initialize = true;
        }   
    }
    
   

    @Test
    public void user_validate_ok_test() {
        RequestUser request = new RequestUser();
        request.setUserName(userName_q);
        request.setPassword(password_q);
        Mockito.when((Object)this.usersRegistry.isThereAlreadyThisUser(request.getUserName())).thenReturn((Object)false);
        Mockito.when((Object)this.userRepository.findByUserName(request.getUserName())).thenReturn((Object)existingUser_q);
        try {
            this.mockMvc.perform((RequestBuilder)MockMvcRequestBuilders.post((String)"/validateUser", (Object[])new Object[0]).contentType("application/json")
                .content(new ObjectMapper().writeValueAsString((Object)request)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath((String)"$.userName", (Object[])new Object[0]).value((Object)existingUser_q.getUserName()))
                .andExpect(MockMvcResultMatchers.jsonPath((String)"$.userType", (Object[])new Object[0]).value((Object)existingUser_q.getUserType()))
                .andExpect(MockMvcResultMatchers.jsonPath((String)"$.name", (Object[])new Object[0]).value((Object)existingUser_q.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath((String)"$.password", (Object[])new Object[0]).doesNotExist());
            ((UserSessionsRegistry)Mockito.verify((Object)this.usersRegistry, (VerificationMode)Mockito.times((int)1))).isThereAlreadyThisUser(request.getUserName());
            ((UserSessionsRegistry)Mockito.verify((Object)this.usersRegistry, (VerificationMode)Mockito.times((int)1))).registerUser(existingUser_q);
            ((ParticipantSessionRepository)Mockito.verify((Object)this.userRepository, (VerificationMode)Mockito.times((int)1))).findByUserName(request.getUserName());
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.userRepository});
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.usersRegistry});
        }
        catch (Exception e) {
            this.log.error(e.toString());
        }
    }

    @Test
    public void user_validate_not_found_test() {
        RequestUser request = new RequestUser();
        request.setUserName("no_existing_userName");
        request.setPassword(password_q);
        Mockito.when((Object)this.usersRegistry.isThereAlreadyThisUser(request.getUserName())).thenReturn((Object)false);
        Mockito.when((Object)this.userRepository.findByUserName(request.getUserName())).thenReturn((Object)null);
        try {
            this.mockMvc.perform((RequestBuilder)MockMvcRequestBuilders.post((String)"/validateUser", (Object[])new Object[0])
                .contentType("application/json")
                .content(new ObjectMapper().writeValueAsString((Object)request)))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.jsonPath((String)"$", (Object[])new Object[0]).doesNotExist());
            ((UserSessionsRegistry)Mockito.verify((Object)this.usersRegistry, (VerificationMode)Mockito.times((int)1))).isThereAlreadyThisUser(request.getUserName());
            ((ParticipantSessionRepository)Mockito.verify((Object)this.userRepository, (VerificationMode)Mockito.times((int)1))).findByUserName(request.getUserName());
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.usersRegistry});
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.userRepository});
        }
        catch (Exception e) {
            this.log.error(e.toString());
        }
    }

    @Test
    public void user_validate_unathourized_test() {
        RequestUser request = new RequestUser();
        request.setUserName(userName_q);
        request.setPassword("no_valid_password");
        Mockito.when((Object)this.usersRegistry.isThereAlreadyThisUser(request.getUserName())).thenReturn((Object)false);
        Mockito.when((Object)this.userRepository.findByUserName(request.getUserName())).thenReturn((Object)existingUser_q);
        try {
            this.mockMvc.perform((RequestBuilder)MockMvcRequestBuilders
                    .post((String)"/validateUser", (Object[])new Object[0])
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString((Object)request)))
                        .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                        .andExpect(MockMvcResultMatchers.jsonPath((String)"$", (Object[])new Object[0]).doesNotExist());
            ((UserSessionsRegistry)Mockito.verify((Object)this.usersRegistry, (VerificationMode)Mockito.times((int)1))).isThereAlreadyThisUser(request.getUserName());
            ((ParticipantSessionRepository)Mockito.verify((Object)this.userRepository, (VerificationMode)Mockito.times((int)1))).findByUserName(request.getUserName());
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.userRepository});
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.usersRegistry});
        }
        catch (Exception e) {
            this.log.error(e.toString());
        }
    }

    @Test
    public void user_validate_conflict_test() {
        RequestUser request = new RequestUser();
        request.setUserName(userName_q);
        request.setPassword(password_q);
        Mockito.when((Object)this.usersRegistry.isThereAlreadyThisUser(request.getUserName())).thenReturn((Object)true);
        Mockito.when((Object)this.userRepository.findByUserName(request.getUserName())).thenReturn((Object)existingUser_q);
        try {
            this.mockMvc.perform((RequestBuilder)MockMvcRequestBuilders
                    .post((String)"/validateUser", (Object[])new Object[0])
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString((Object)request)))
                        .andExpect(MockMvcResultMatchers.status().isConflict())
                        .andExpect(MockMvcResultMatchers.jsonPath((String)"$", (Object[])new Object[0]).doesNotExist());
            ((UserSessionsRegistry)Mockito.verify((Object)this.usersRegistry, (VerificationMode)Mockito.times((int)1))).isThereAlreadyThisUser(userName_q);
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.userRepository});
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.usersRegistry});
        }
        catch (Exception e) {
            this.log.error(e.toString());
        }
    }
    
    
     
    @Test
    public void register_new_user_test(){
        ParticipantSession newUser= ParticipantSessionDispenser.getTutorParticipant("no_existing_user");
        Mockito.when((Object)this.userRepository.findByUserName(newUser.getUserName())).thenReturn(null);
        try {
            this.mockMvc.perform((RequestBuilder)MockMvcRequestBuilders
                    .post((String)"/register", (Object[])new Object[0])
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString((Object)newUser)))
                        .andExpect(MockMvcResultMatchers.status().isOk())
                        .andExpect(MockMvcResultMatchers.jsonPath((String)"$.userName", (Object[])new Object[0]).value((Object)newUser.getUserName()))
                        .andExpect(MockMvcResultMatchers.jsonPath((String)"$.userType", (Object[])new Object[0]).value((Object)newUser.getUserType()))
                        .andExpect(MockMvcResultMatchers.jsonPath((String)"$.name", (Object[])new Object[0]).value((Object)newUser.getName()))
                        .andExpect(MockMvcResultMatchers.jsonPath((String)"$.password", (Object[])new Object[0]).doesNotExist());
            ((UserSessionsRegistry)Mockito.verify((Object)this.usersRegistry, (VerificationMode)Mockito.times((int)1))).registerUser(newUser);
            ((ParticipantSessionRepository)Mockito.verify((Object)this.userRepository, (VerificationMode)Mockito.times((int)1))).save(newUser);
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.userRepository});
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.usersRegistry});
        }
        catch (Exception e) {
            this.log.error(e.toString());
        }
    }
    
    @Test
    public void validateFiel_validUserNameTest(){
        FieldValidationRequest fieldRequest = new FieldValidationRequest();
        String newUserName = "no_exisiting_userName";
        fieldRequest.setField("userName");
        fieldRequest.setValue(newUserName);
        Mockito.when((Object)this.userRepository.findByUserName(newUserName)).thenReturn(null);
        try {
            this.mockMvc.perform((RequestBuilder)MockMvcRequestBuilders
                    .post((String)"/validateField", (Object[])new Object[0])
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString((Object)fieldRequest)))
                        .andExpect(MockMvcResultMatchers.status().isOk())
                        .andExpect(MockMvcResultMatchers.jsonPath((String)"$.message", (Object[])new Object[0]).doesNotExist());
                    ((ParticipantSessionRepository)Mockito.verify((Object)this.userRepository, (VerificationMode)Mockito.times((int)1))).findByUserName(newUserName);
                    Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.userRepository});    
        }
        catch (Exception e) {
            this.log.error(e.toString());
        }
    }
    
    @Test
    public void validateFiel_noValidUserNameTest(){
        FieldValidationRequest fieldRequest = new FieldValidationRequest();
        fieldRequest.setField("userName");
        fieldRequest.setValue(existingUser_q.getUserName());
        Mockito.when((Object)this.userRepository.findByUserName(existingUser_q.getUserName())).thenReturn(existingUser_q);
        try {
            this.mockMvc.perform((RequestBuilder)MockMvcRequestBuilders
                    .post((String)"/validateField", (Object[])new Object[0])
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString((Object)fieldRequest)))
                        .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                        .andExpect(MockMvcResultMatchers.jsonPath((String)"$.message", (Object[])new Object[0]).value((Object)"userName taken"));
                    ((ParticipantSessionRepository)Mockito.verify((Object)this.userRepository, (VerificationMode)Mockito.times((int)1))).findByUserName(existingUser_q.getUserName());
                    Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.userRepository});
                
        }
        catch (Exception e) {
            this.log.error(e.toString());
        }
    }
    
    @Test
    public void validateFiel_validEmailTest(){
        FieldValidationRequest fieldRequest = new FieldValidationRequest();
        String newEmail = "no_exisiting_email";
        fieldRequest.setField("email");
        fieldRequest.setValue(newEmail);
        Mockito.when((Object)this.userRepository.findByEmail(newEmail)).thenReturn(null);
        try {
            this.mockMvc.perform((RequestBuilder)MockMvcRequestBuilders
                    .post((String)"/validateField", (Object[])new Object[0])
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString((Object)fieldRequest)))
                        .andExpect(MockMvcResultMatchers.status().isOk())
                        .andExpect(MockMvcResultMatchers.jsonPath((String)"$.message", (Object[])new Object[0]).doesNotExist());
            ((ParticipantSessionRepository)Mockito.verify((Object)this.userRepository, (VerificationMode)Mockito.times((int)1))).findByEmail(newEmail);
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.userRepository});            
        }
        catch (Exception e) {
            this.log.error(e.toString());
        }
    }
    
    
    @Test
    public void validateFiel_NoValidEmailTest(){
        FieldValidationRequest fieldRequest = new FieldValidationRequest();
        fieldRequest.setField("email");
        fieldRequest.setValue(existingUser_q.getEmail());
        Mockito.when((Object)this.userRepository.findByEmail(existingUser_q.getEmail())).thenReturn(existingUser_q);
        try {
            this.mockMvc.perform((RequestBuilder)MockMvcRequestBuilders
                    .post((String)"/validateField", (Object[])new Object[0])
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString((Object)fieldRequest)))
                        .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                        .andExpect(MockMvcResultMatchers.jsonPath((String)"$.message", (Object[])new Object[0]).value((Object)"email taken"));
            ((ParticipantSessionRepository)Mockito.verify((Object)this.userRepository, (VerificationMode)Mockito.times((int)1))).findByEmail(existingUser_q.getEmail());
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.userRepository});
        }
        catch (Exception e) {
            this.log.error(e.toString());
        }
    }
    
    
    @Test
    public void editPerfilTest(){
        User modifiedUser = ParticipantSessionDispenser.getStudent(userName_q);
        modifiedUser.setEmail("new_email");
        modifiedUser.setName("new_name");
        modifiedUser.setSurname("new_surname");
        Mockito.when((Object)this.userRepository.findByUserName(userName_q)).thenReturn(existingUser_q);
        try {
            this.mockMvc.perform((RequestBuilder)MockMvcRequestBuilders
                    .post((String)"/editPerfil", (Object[])new Object[0])
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString((Object)modifiedUser)))
                        .andExpect(MockMvcResultMatchers.status().isOk())
                        .andExpect(MockMvcResultMatchers.jsonPath((String)"$.userName", (Object[])new Object[0]).value((Object)modifiedUser.getUserName()))
                        .andExpect(MockMvcResultMatchers.jsonPath((String)"$.userType", (Object[])new Object[0]).value((Object)modifiedUser.getUserType()))
                        .andExpect(MockMvcResultMatchers.jsonPath((String)"$.name", (Object[])new Object[0]).value((Object)modifiedUser.getName()))
                        .andExpect(MockMvcResultMatchers.jsonPath((String)"$.password", (Object[])new Object[0]).doesNotExist());
            ((ParticipantSessionRepository)Mockito.verify((Object)this.userRepository, (VerificationMode)Mockito.times((int)1))).findByUserName(existingUser_q.getUserName());
            ((ParticipantSessionRepository)Mockito.verify((Object)this.userRepository, (VerificationMode)Mockito.times((int)1))).save(existingUser_q);
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.userRepository});
        }
        catch (Exception e) {
            this.log.error(e.toString());
        }
    }
    
}
