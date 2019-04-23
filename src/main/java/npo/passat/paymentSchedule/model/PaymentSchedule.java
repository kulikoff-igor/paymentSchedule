package npo.passat.paymentSchedule.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "payment_schedule")
public class PaymentSchedule {

    private Integer idPaymentSchedule;
    private String company;
    private String destinationObject;
    private String contract;
    private Double amount;
    private String currency;
    private String conditions;
    private Date scheduledDate;
    private Date actualDate;
    private Boolean paid = false;
    private Double actualAmount;
    private String user;

    public PaymentSchedule(String company, String destinationObject, String contract, Double amount, String currency, String conditions, Date scheduledDate, String user) {
        this.company = company;
        this.destinationObject = destinationObject;
        this.contract = contract;
        this.amount = amount;
        this.currency = currency;
        this.conditions = conditions;
        this.scheduledDate = scheduledDate;
        this.user = user;
    }

    public PaymentSchedule() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPaymentSchedule", nullable = false)
    public Integer getIdPaymentSchedule() {
        return idPaymentSchedule;
    }

    public void setIdPaymentSchedule(Integer idPaymentSchedule) {
        this.idPaymentSchedule = idPaymentSchedule;
    }

    @Basic
    @Column(name = "company", nullable = false, length = 200)
    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    @Basic
    @Column(name = "destinationObject", nullable = true, length = 200)
    public String getDestinationObject() {
        return destinationObject;
    }

    public void setDestinationObject(String destinationObject) {
        this.destinationObject = destinationObject;
    }

    @Basic
    @Column(name = "contract", nullable = true, length = 200)
    public String getContract() {
        return contract;
    }

    public void setContract(String contract) {
        this.contract = contract;
    }

    @Basic
    @Column(name = "amount", nullable = true, precision = 0)
    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    @Basic
    @Column(name = "currency", nullable = true, length = 200)
    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    @Basic
    @Column(name = "conditions", nullable = true, length = 200)
    public String getConditions() {
        return conditions;
    }

    public void setConditions(String conditions) {
        this.conditions = conditions;
    }

    @Basic
    @Column(name = "scheduledDate", nullable = true, precision = 0)
    public Date getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(Date scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    @Basic
    @Column(name = "actualDate", nullable = true, precision = 0)
    public Date getActualDate() {
        return actualDate;
    }

    public void setActualDate(Date actualDate) {
        this.actualDate = actualDate;
    }

    @Basic
    @Column(name = "actualAmount", nullable = true, length = 200)
    public Double getActualAmount() {
        return actualAmount;
    }

    public void setActualAmount(Double actualAmount) {
        this.actualAmount = actualAmount;
    }

    @Basic
    @Column(name = "paid", nullable = false, precision = 0)
    public Boolean getPaid() {
        return paid;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }

    @Basic
    @Column(name = "user", nullable = false, length = 200)
    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "payment{" + idPaymentSchedule +
                "," + company +
                "," + destinationObject +
                "," + contract +
                ", " + amount +
                "," + currency +
                "," + conditions +
                ", " + scheduledDate +
                ", " + actualDate +
                ", " + paid +
                ", " + actualAmount +
                '}';
    }
}
