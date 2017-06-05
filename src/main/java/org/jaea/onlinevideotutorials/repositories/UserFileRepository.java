package org.jaea.onlinevideotutorials.repositories;

import org.jaea.onlinevideotutorials.domain.UserFile;
import org.springframework.data.repository.CrudRepository;

public interface UserFileRepository extends CrudRepository<UserFile, Long>{
    public UserFile findByName(String name);
}
