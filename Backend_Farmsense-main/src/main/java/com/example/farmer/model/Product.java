package com.example.farmer.model;

import com.example.farmer.Authentication.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductType type;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer stockQuantity;

    @Column(nullable = false)
    private LocalDate manufacturingDate;

    @Column(nullable = false)
    private LocalDate expiryDate;

    private String manufacturer;

    private String applicationMethod;

    private String safetyInstructions;

    @Column(nullable = false)
    private Integer minimumStockLevel = 10;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(nullable = false)
    private Boolean banned = false;

    // Many-to-one relationship with User
    @JsonBackReference(value = "User_ID")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public enum ProductType {
        FERTILIZER, PESTICIDE, CHEMICAL, OTHER
    }
}
