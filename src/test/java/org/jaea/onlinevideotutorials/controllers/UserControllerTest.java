package org.jaea.onlinevideotutorials.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.jaea.onlinevideotutorials.controllers.UserController;
import org.jaea.onlinevideotutorials.domain.RequestUser;
import org.jaea.onlinevideotutorials.domain.User;
import org.jaea.onlinevideotutorials.domain.UserFile;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;
import org.jaea.onlinevideotutorials.repositories.UserRepository;
import org.junit.BeforeClass;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.stubbing.OngoingStubbing;
import org.mockito.verification.VerificationMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;
import org.springframework.web.context.WebApplicationContext;





@RunWith(SpringRunner.class)
@WebMvcTest(value={UserController.class})
public class UserControllerTest {
    private final Logger log = LoggerFactory.getLogger(UserController.class);
  
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private UserSessionsRegistry usersRegistry;
    @MockBean
    private UserRepository userRepository;
   
    static User user;
    static String userName;
    static String password;

    static boolean initialize = false;

    @Before
    public void setUp() { //public static void setUp() {

        if (!initialize){
            userName = "angela.gossow";
            password = "immortal";
            user = new User(userName, "tutor", "Angela Gossow", password);
           // this.mockMvc = webAppContextSetup(webApplicationContext).build();
            initialize = true;
        }   
    }
    

    @Test
    public void user_validate_ok_test() {
        RequestUser request = new RequestUser();
        request.setUserName(userName);
        request.setPassword(password);
        Mockito.when((Object)this.usersRegistry.isThereAlreadyThisUser(request.getUserName())).thenReturn((Object)false);
        Mockito.when((Object)this.userRepository.findByUserName(request.getUserName())).thenReturn((Object)user);
        try {
            this.mockMvc.perform((RequestBuilder)MockMvcRequestBuilders.post((String)"/validateUser", (Object[])new Object[0]).contentType("application/json")
                .content(new ObjectMapper().writeValueAsString((Object)request)))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath((String)"$.userName", (Object[])new Object[0]).value((Object)user.getUserName()))
            .andExpect(MockMvcResultMatchers.jsonPath((String)"$.userType", (Object[])new Object[0]).value((Object)user.getUserType()))
            .andExpect(MockMvcResultMatchers.jsonPath((String)"$.name", (Object[])new Object[0]).value((Object)user.getName()))
            .andExpect(MockMvcResultMatchers.jsonPath((String)"$.password", (Object[])new Object[0]).doesNotExist());
        }
        catch (Exception e) {
            ((UserSessionsRegistry)Mockito.verify((Object)this.usersRegistry, (VerificationMode)Mockito.times((int)1))).isThereAlreadyThisUser(request.getUserName());
            ((UserRepository)Mockito.verify((Object)this.userRepository, (VerificationMode)Mockito.times((int)1))).findByUserName(request.getUserName());
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.userRepository});
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.usersRegistry});
        }
    }

    @Test
    public void user_validate_not_found_test() {
        RequestUser request = new RequestUser();
        request.setUserName(userName + "xxx");
        request.setPassword(password);
        Mockito.when((Object)this.usersRegistry.isThereAlreadyThisUser(request.getUserName())).thenReturn((Object)false);
        Mockito.when((Object)this.userRepository.findByUserName(request.getUserName())).thenReturn((Object)null);
        try {
            this.mockMvc.perform((RequestBuilder)MockMvcRequestBuilders.post((String)"/validateUser", (Object[])new Object[0])
                .contentType("application/json")
                .content(new ObjectMapper().writeValueAsString((Object)request)))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(MockMvcResultMatchers.jsonPath((String)"$", (Object[])new Object[0]).doesNotExist());
        }
        catch (Exception e) {
            ((UserSessionsRegistry)Mockito.verify((Object)this.usersRegistry, (VerificationMode)Mockito.times((int)1))).isThereAlreadyThisUser(request.getUserName());
            ((UserRepository)Mockito.verify((Object)this.userRepository, (VerificationMode)Mockito.times((int)1))).findByUserName(request.getUserName());
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.usersRegistry});
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.userRepository});
        }
    }

    @Test
    public void user_validate_unathourized_test() {
        RequestUser request = new RequestUser();
        request.setUserName(userName);
        request.setPassword(password + "xxx");
        Mockito.when((Object)this.usersRegistry.isThereAlreadyThisUser(request.getUserName())).thenReturn((Object)false);
        Mockito.when((Object)this.userRepository.findByUserName(request.getUserName())).thenReturn((Object)user);
        try {
            this.mockMvc.perform((RequestBuilder)MockMvcRequestBuilders.post((String)"/validateUser", (Object[])new Object[0]).contentType("application/json").content(new ObjectMapper().writeValueAsString((Object)request))).andExpect(MockMvcResultMatchers.status().isUnauthorized()).andExpect(MockMvcResultMatchers.jsonPath((String)"$", (Object[])new Object[0]).doesNotExist());
        }
        catch (Exception e) {
            ((UserSessionsRegistry)Mockito.verify((Object)this.usersRegistry, (VerificationMode)Mockito.times((int)1))).isThereAlreadyThisUser(request.getUserName());
            ((UserRepository)Mockito.verify((Object)this.userRepository, (VerificationMode)Mockito.times((int)1))).findByUserName(request.getUserName());
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.userRepository});
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.usersRegistry});
        }
    }

    @Test
    public void user_validate_conflict_test() {
        RequestUser request = new RequestUser();
        request.setUserName(userName);
        request.setPassword(password);
        Mockito.when((Object)this.usersRegistry.isThereAlreadyThisUser(request.getUserName())).thenReturn((Object)true);
        Mockito.when((Object)this.userRepository.findByUserName(request.getUserName())).thenReturn((Object)user);
        try {
            this.mockMvc.perform((RequestBuilder)MockMvcRequestBuilders.post((String)"/validateUser", (Object[])new Object[0]).contentType("application/json").content(new ObjectMapper().writeValueAsString((Object)request))).andExpect(MockMvcResultMatchers.status().isConflict()).andExpect(MockMvcResultMatchers.jsonPath((String)"$", (Object[])new Object[0]).doesNotExist());
        }
        catch (Exception e) {
            ((UserSessionsRegistry)Mockito.verify((Object)this.usersRegistry, (VerificationMode)Mockito.times((int)1))).isThereAlreadyThisUser(userName);
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.userRepository});
            Mockito.verifyNoMoreInteractions((Object[])new Object[]{this.usersRegistry});
        }
    }
}
