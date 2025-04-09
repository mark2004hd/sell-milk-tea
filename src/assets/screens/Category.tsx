import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Headers from '../components/Header'; // Import Headers

interface CategoryItem {
  id: string;
  title: string;
  image: string;
}

const categories: CategoryItem[] = [
  {
    id: '1',
    title: 'Trà Sữa Trân Châu Đường Đen',
    image: 'https://via.placeholder.com/300x150',
  },
  {
    id: '2',
    title: 'Trà Xanh Matcha Đá Xay',
    image: 'https://via.placeholder.com/300x150',
  },
  {
    id: '3',
    title: 'Cà Phê Sữa Đá',
    image: 'https://via.placeholder.com/300x150',
  },
  {
    id: '4',
    title: 'Nước Ép Trái Cây Tươi',
    image: 'https://via.placeholder.com/300x150',
  },
];

const Category = () => {
  const renderCategoryItem = ({ item }: { item: CategoryItem }) => (
    <View style={styles.categoryCard}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.categoryList}
        nestedScrollEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryList: {
    padding: 16,
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default Category;