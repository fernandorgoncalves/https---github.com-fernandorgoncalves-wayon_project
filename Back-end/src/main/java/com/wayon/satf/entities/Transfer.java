package com.wayon.satf.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tb_transfer")
public class Transfer implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer sourceAccount;
    private Integer destinationAccount;
    private BigDecimal transferValue;
    private BigDecimal fee;
    private LocalDate transferDate;
    private LocalDate schedulingDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private User client;

    public Transfer() {
    }

    public Transfer(Long id, Integer sourceAccount, Integer destinationAccount, BigDecimal transferValue,
            BigDecimal fee, LocalDate transferDate, LocalDate schedulingDate, User client) {
        this.id = id;
        this.sourceAccount = sourceAccount;
        this.destinationAccount = destinationAccount;
        this.transferValue = transferValue;
        this.fee = fee;
        this.transferDate = transferDate;
        this.schedulingDate = schedulingDate;
        this.client = client;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSourceAccount() {
        return sourceAccount;
    }

    public void setSourceAccount(Integer sourceAccount) {
        this.sourceAccount = sourceAccount;
    }

    public Integer getDestinationAccount() {
        return destinationAccount;
    }

    public void setDestinationAccount(Integer destinationAccount) {
        this.destinationAccount = destinationAccount;
    }

    public BigDecimal getTransferValue() {
        return transferValue;
    }

    public void setTransferValue(BigDecimal transferValue) {
        this.transferValue = transferValue;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    public LocalDate getTransferDate() {
        return transferDate;
    }

    public void setTransferDate(LocalDate transferDate) {
        this.transferDate = transferDate;
    }

    public LocalDate getSchedulingDate() {
        return schedulingDate;
    }

    public void setSchedulingDate(LocalDate schedulingDate) {
        this.schedulingDate = schedulingDate;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Transfer other = (Transfer) obj;
        return Objects.equals(id, other.id);
    }

    @PrePersist
    @PreUpdate
    public void calculateFee() {
        if (transferDate == null) {

            throw new IllegalArgumentException("A data de transferência não pode ser nula.");
        }


        long days = ChronoUnit.DAYS.between(schedulingDate, transferDate);

        if (days == 0) { 
            this.fee = transferValue.multiply(new BigDecimal("0.025")).add(new BigDecimal("3.00"));
        } else if (days >= 1 && days <= 10) { 
            this.fee = new BigDecimal("12.00");
        } else if (days > 10 && days <= 20) { 
            this.fee = transferValue.multiply(new BigDecimal("0.082"));
        } else if (days > 20 && days <= 30) { 
            this.fee = transferValue.multiply(new BigDecimal("0.069"));
        } else if (days > 30 && days <= 40) { 
            this.fee = transferValue.multiply(new BigDecimal("0.047"));
        } else if (days > 40) { 
            this.fee = transferValue.multiply(new BigDecimal("0.017"));
        }
    }
}