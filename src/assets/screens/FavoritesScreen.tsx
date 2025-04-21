import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites, FavoriteItem } from '../context/FavoritesContext'; // Import FavoriteItem
import { usePromotions } from '../context/PromotionsContext';

const { width } = Dimensions.get('window');

const scaleFont = (size: number) => {
  return size * (width / 375);
};

const scaleDimension = (size: number) => {
  return size * (width / 375);
};

const FavoritesScreen = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { promotions } = usePromotions();
  
  const [categories, setCategories] = useState<string[]>(['All']);
  const [categoryColors, setCategoryColors] = useState<{ [key: string]: string }>({ All: '#000' });
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Trích xuất danh mục từ promotions
  useEffect(() => {
    const uniqueTags = new Set<string>();
    const tagColorMap: { [key: string]: string } = { All: '#000' }; // Màu mặc định cho "All"

    promotions.forEach((promo) => {
      if (promo.tag) {
        uniqueTags.add(promo.tag);
        if (promo.tagColor) {
          tagColorMap[promo.tag] = promo.tagColor;
        }
      }
    });

    const newCategories = ['All', ...Array.from(uniqueTags)];
    setCategories(newCategories);
    setCategoryColors(tagColorMap);
  }, [promotions]);

  // Lọc favorites theo danh mục đã chọn
  const filteredFavorites = selectedCategory === 'All'
    ? favorites
    : favorites.filter((fav) => fav.tag === selectedCategory);

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        {
          backgroundColor: selectedCategory === item ? categoryColors[item] || '#000' : '#fff',
          borderColor: categoryColors[item] || '#000',
        },
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          { color: selectedCategory === item ? '#fff' : categoryColors[item] || '#000' },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderFavorite = ({ item }: { item: FavoriteItem }) => (
    <View style={styles.favoriteItem}>
      <Image source={{ uri: item.image }} style={styles.favoriteImage} />
      <View style={styles.favoriteDetails}>
        <Text style={styles.favoriteTitle}>{item.title}</Text>
        <Text style={styles.favoriteDescription}>
          {item.description} (Size: {item.size})
        </Text>
        <Text style={styles.favoritePrice}>{item.price.toFixed(2)} USD</Text>
        {item.tag && (
          <View
            style={[
              styles.tag,
              { backgroundColor: item.tagColor || '#ccc' },
            ]}
          >
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => removeFromFavorites(item.id, item.size)}
        style={styles.removeButton}
      >
        <Ionicons name="trash-outline" size={scaleFont(20)} color="#FF6347" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <Ionicons name="search-outline" size={scaleFont(24)} color="#333" />
      </View>
      <View style={styles.filterRow}>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
        />
      </View>
      <View style={styles.sortRow}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={scaleFont(20)} color="#333" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="swap-vertical-outline" size={scaleFont(20)} color="#333" />
          <Text style={styles.sortText}>Price: lowest to high</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Ionicons name="grid-outline" size={scaleFont(20)} color="#333" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredFavorites}
        renderItem={renderFavorite}
        keyExtractor={(item) => `${item.id}-${item.size}`}
        ListEmptyComponent={<Text style={styles.emptyText}>No favorites yet!</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleDimension(15),
    paddingVertical: scaleDimension(10),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#333',
  },
  filterRow: {
    paddingVertical: scaleDimension(10),
  },
  categoryList: {
    paddingHorizontal: scaleDimension(10),
  },
  categoryItem: {
    paddingHorizontal: scaleDimension(15),
    paddingVertical: scaleDimension(8),
    marginHorizontal: scaleDimension(5),
    borderRadius: scaleDimension(20),
    borderWidth: 1,
  },
  categoryText: {
    fontSize: scaleFont(14),
    fontWeight: 'bold',
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleDimension(15),
    paddingVertical: scaleDimension(5),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: scaleFont(14),
    color: '#333',
    marginLeft: scaleDimension(5),
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: scaleFont(14),
    color: '#333',
    marginLeft: scaleDimension(5),
  },
  gridButton: {
    padding: scaleDimension(5),
  },
  favoriteItem: {
    flexDirection: 'row',
    padding: scaleDimension(15),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  favoriteImage: {
    width: scaleDimension(80),
    height: scaleDimension(80),
    borderRadius: scaleDimension(10),
    marginRight: scaleDimension(10),
  },
  favoriteDetails: {
    flex: 1,
  },
  favoriteTitle: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: scaleDimension(5),
  },
  favoriteDescription: {
    fontSize: scaleFont(12),
    color: '#666',
    marginBottom: scaleDimension(5),
  },
  favoritePrice: {
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    color: '#FF6347',
    marginBottom: scaleDimension(5),
  },
  tag: {
    paddingHorizontal: scaleDimension(10),
    paddingVertical: scaleDimension(5),
    borderRadius: scaleDimension(10),
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: scaleFont(12),
    color: '#fff',
  },
  removeButton: {
    padding: scaleDimension(10),
  },
  emptyText: {
    fontSize: scaleFont(16),
    color: '#666',
    textAlign: 'center',
    marginTop: scaleDimension(20),
  },
});

export default FavoritesScreen;