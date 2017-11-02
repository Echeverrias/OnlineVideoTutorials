package org.jaea.onlinevideotutorials.domain;

public class RoomHistory{

public RoomHistory(){}

    /*
    private final Logger log = LoggerFactory.getLogger(RoomHistory.class);

    
    
    @ManyToMany(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(
        name="rooms_users",
        joinColumns=@JoinColumn(name="room_id", referencedColumnName="id"),
        inverseJoinColumns=@JoinColumn(name="user_id", referencedColumnName="id")
        )
    @JsonIgnoreProperties(value = "roomsHistory")
    private List<ParticipantSession> participantsHistory = new ArrayList<>();
    
    // The tutor is included in the participants
    @Transient
    private final ConcurrentHashMap<String, ParticipantSession> participantsByUserName = new ConcurrentHashMap<>();
    
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties(value = "room")
    private List<UserFile> filesHistory = new ArrayList<>();

    @Transient
    private MediaPipeline pipeline;
    
    public RoomHistory(MediaRoom room){
        this.name = room.name;
        this.tutor = room.tutor;
        this.createdAt = room.createdAt;
        this.participantsHistory = room.getParticipantsHistory();
    }
*/
}