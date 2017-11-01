package org.jaea.onlinevideotutorials.repositories;

import java.util.List;
import org.jaea.onlinevideotutorials.domain.UserFile;
import org.springframework.data.repository.CrudRepository;

public interface UserFileRepository extends CrudRepository<UserFile, Long>{
    public List<UserFile> findByName(String name);
}
