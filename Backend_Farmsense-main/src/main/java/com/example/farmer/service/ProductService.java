package com.example.farmer.service;

import com.example.farmer.dto.OrdersDTO;
import com.example.farmer.dto.ProductDTO;
import com.example.farmer.model.Orders;
import com.example.farmer.model.Product;
import com.example.farmer.repository.ProductRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    public List<Product> getLowStockProducts() {
        return productRepository.findAll().stream()
                .filter(product -> product.getStockQuantity() <= product.getMinimumStockLevel())
                .collect(Collectors.toList());
    }
    public List<Product> getProductsNearExpiry(int days) {
        LocalDate today = LocalDate.now();
        LocalDate thresholdDate = today.plusDays(days);

        return productRepository.findAll().stream()
                .filter(product -> product.getExpiryDate().isBefore(thresholdDate) && product.getExpiryDate().isAfter(today))
                .collect(Collectors.toList());
    }
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByUserId(Long userId) {
        return productRepository.findByUserId(userId);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        return productRepository.findById(id).map(product -> {
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setType(productDetails.getType());
            product.setPrice(productDetails.getPrice());
            product.setStockQuantity(productDetails.getStockQuantity());
            product.setManufacturingDate(productDetails.getManufacturingDate());
            product.setExpiryDate(productDetails.getExpiryDate());
            product.setManufacturer(productDetails.getManufacturer());
            product.setApplicationMethod(productDetails.getApplicationMethod());
            product.setSafetyInstructions(productDetails.getSafetyInstructions());
            product.setMinimumStockLevel(productDetails.getMinimumStockLevel());
            product.setActive(productDetails.getActive());
            product.setBanned(productDetails.getBanned());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public ProductDTO getCartItemsByUserId(Integer productId) {
        Product product = productRepository.findPriceByProductId(productId);
        return modelMapper.map(product,ProductDTO.class);

    }
}
