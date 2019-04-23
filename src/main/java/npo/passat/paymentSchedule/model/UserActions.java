package npo.passat.paymentSchedule.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_actions")
public class UserActions {
    private int id;
    private Date dateAction;
    private String user;
    private String action;

    public UserActions(Date dateAction, String user,String action) {
        this.dateAction = dateAction;
        this.user = user;
        this.action = action;
    }

    public UserActions() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "dateAction", nullable = false, precision = 0)
    public Date getDateAction() {
        return dateAction;
    }

    public void setDateAction(Date dateAction) {
        this.dateAction = dateAction;
    }

    @Basic
    @Column(name = "user", nullable = false)
    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
    @Basic
    @Column(name = "action", nullable = false, length = 254)
    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
