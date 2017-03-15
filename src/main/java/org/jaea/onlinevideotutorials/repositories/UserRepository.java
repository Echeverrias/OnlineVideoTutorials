package org.jaea.onlinevideotutorials.repositories;

import org.jaea.onlinevideotutorials.domain.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,Long>{

    public User findByUserName(String userName);

    public User findByEmail(String email);
    
    public User findByUserImageId(Long id);
}
