package backend.back.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CoffeeShopController {

    @GetMapping("/promotions")
    public Map<String, Object> getPromotions() {
        List<Map<String, Object>> promotions = Arrays.asList(
                createPromotion("1", "Caramel Matcha", "3.75USD",
                        "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "Hot", "#FF6347",
                        "A sweet and creamy matcha drink topped with cheese foam. Perfect for a cozy afternoon."),
                createPromotion("2", "Berry Bliss", "2.50USD",
                        "COOL & SMOOTH | CHOCOLATE DELIGHT",
                        "https://cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/67fbda4a0025f51ed3cf/view?project=67ed5f5e00176f489872&mode=admin",
                        "New", "#FF8C00",
                        "A refreshing berry-based drink with a smooth chocolate twist. Enjoy the best of both worlds."),
                createPromotion("3", "Tropical Yogurt", "3.90USD",
                        "CREAMY YOGURT | MIXED TROPICAL FRUITS | CHILLED",
                        "https://cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/1/view?project=67ed5f5e00176f489872&mode=admin",
                        "Seasonal", "#32CD32",
                        "A creamy yogurt blended with tropical fruits, perfect for a refreshing and cooling treat."),
                createPromotion("4", "Mocha Thunder", "2.95USD",
                        "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
                        "https://cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/67fbda8a0003883d0016/view?project=67ed5f5e00176f489872&mode=admin",
                        "Hot", "#FF6347",
                        "A bold mocha coffee with a thunderous caffeine kick. Perfect for those needing an energy boost."),
                createPromotion("5", "Peach Tea", "2.30USD",
                        "FRUITY & TANGY | SUMMER VIBES",
                        "https://cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/67fbda56000979606ad6/view?project=67ed5f5e00176f489872&mode=admin",
                        "New", "#FF8C00",
                        "A refreshing peach tea, tangy and light, perfect for a summer day."),
                createPromotion("6", "Mocha Thunder", "2.95USD",
                        "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "Hot", "#FF6347",
                        "A strong mocha flavor with an intense caffeine punch. Ideal for mocha lovers."),
                createPromotion("7", "Peach Tea", "2.30USD",
                        "FRUITY & TANGY | SUMMER VIBES",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "New", "#FF8C00",
                        "A fruity peach tea with a tangy twist. Perfect for any time of the day."),
                createPromotion("8", "Lychee Fizz", "3.10USD",
                        "REFRESHING | HINT OF LIME | FRUITY BURST",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "Seasonal", "#32CD32",
                        "A refreshing lychee drink with a hint of lime, bursting with fruity flavors."),
                createPromotion("9", "Choco Mint", "3.65USD",
                        "COOL & SMOOTH | CHOCOLATE DELIGHT",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "Hot", "#FF6347",
                        "A cool and smooth chocolate drink with a refreshing minty twist."),
                createPromotion("10", "Strawberry Cheese", "2.45USD",
                        "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "New", "#FF8C00",
                        "A sweet strawberry treat topped with creamy cheese foam."),
                createPromotion("11", "Matcha Smoothie", "3.55USD",
                        "COOL & SMOOTH | CHOCOLATE DELIGHT",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "Seasonal", "#32CD32",
                        "A cool and smooth matcha smoothie for a delightful experience."),
                createPromotion("12", "Coconut Latte", "3.20USD",
                        "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "Hot", "#FF6347",
                        "A rich coconut latte with a bold flavor and high caffeine content."),
                createPromotion("13", "Green Apple Mojito", "1.89USD",
                        "REFRESHING | HINT OF LIME | FRUITY BURST",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "New", "#FF8C00",
                        "A zesty green apple mojito with a hint of lime, perfect for a refreshing burst."),
                createPromotion("14", "Vanilla Cloud", "2.90USD",
                        "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "Seasonal", "#32CD32",
                        "A smooth and creamy vanilla drink topped with delicious cheese foam."),
                createPromotion("15", "Rose Latte", "3.70USD",
                        "FRUITY & TANGY | SUMMER VIBES",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "New", "#FF8C00",
                        "A fragrant rose latte with fruity and tangy notes for a refreshing twist."),
                createPromotion("16", "Banana Brew", "2.85USD",
                        "CREAMY YOGURT | MIXED TROPICAL FRUITS | CHILLED",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "Hot", "#FF6347",
                        "A tropical brew with creamy yogurt and mixed fruits for a chilled delight."),
                createPromotion("17", "Pineapple Punch", "3.25USD",
                        "FRUITY & TANGY | SUMMER VIBES",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "Seasonal", "#32CD32",
                        "A tangy pineapple punch, perfect for a vibrant summer experience."),
                createPromotion("18", "Double Espresso", "2.75USD",
                        "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "Hot", "#FF6347",
                        "A strong double espresso to keep you energized throughout the day."),
                createPromotion("19", "Lavender Dream", "3.60USD",
                        "COOL & SMOOTH | CHOCOLATE DELIGHT",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "New", "#FF8C00",
                        "A smooth lavender drink with a chocolatey touch for a dreamy experience."),
                createPromotion("20", "Oreo Milkshake", "3.80USD",
                        "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "Seasonal", "#32CD32",
                        "A sweet and creamy Oreo milkshake topped with a delightful cheese foam."),
                createPromotion("21", "Mango Tango", "2.95USD",
                        "REFRESHING | HINT OF LIME | FRUITY BURST",
                        "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
                        "Hot", "#FF6347",
                        "A refreshing mango drink with a hint of lime, perfect for a tropical burst.")
        );

        Map<String, Object> response = new HashMap<>();
        response.put("Promotion", promotions);
        response.put("totalResults", String.valueOf(promotions.size()));
        response.put("Response", "True");

        return response;
    }

    private Map<String, Object> createPromotion(String id, String title, String price,
                                                String description, String image, String tag, String tagColor, String product) {
        Map<String, Object> promotion = new HashMap<>();
        promotion.put("id", id);
        promotion.put("title", title);
        promotion.put("price", price);
        promotion.put("description", description);
        promotion.put("image", image);
        promotion.put("tag", tag);
        promotion.put("tagColor", tagColor);
        promotion.put("product", product);
        return promotion;
    }
}