package org.jaea.onlinevideotutorials.repositories;

import java.util.List;
import org.jaea.onlinevideotutorials.domain.MediaRoom;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.repository.CrudRepository;

//@EnableJpaAuditing
public interface MediaRoomRepository extends CrudRepository<MediaRoom, Long>{
    public List<MediaRoom> findByName(String name);
}