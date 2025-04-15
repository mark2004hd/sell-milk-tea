import React, { useState, useEffect } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Profile from "./Profile";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { usePromotions } from "../context/PromotionsContext";

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Category: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Promotion {
  id: string;
  title: string;
  price: number; // Đổi sang number
  image: string;
  description: string;
  tag?: string;
  tagColor?: string;
}

interface Notification {
  id: string;
  message: string;
  isRead: boolean;
}

const Header = () => {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const { promotions } = usePromotions();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", message: "You have a new order!", isRead: false },
    { id: "2", message: "Your milk tea is ready!", isRead: false },
    { id: "3", message: "New promotion available!", isRead: false },
  ]);
  const [showBadge, setShowBadge] = useState(true);

  const hasUnreadNotifications = notifications.some((notification) => !notification.isRead);

  useEffect(() => {
    if (isNotificationVisible) {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    }
  }, [isNotificationVisible]);

  useEffect(() => {
    if (!isFocused) {
      setShowBadge(false);
    }
  }, [isFocused]);

  const handleSearchPress = () => {
    navigation.navigate("Search");
  };

  const handleNotificationPress = () => {
    setIsNotificationVisible(true);
  };

  return (
    <View style={headerstyle.headerView}>
      <Modal
        visible={isNotificationVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsNotificationVisible(false)}
      >
        <View style={headerstyle.modalContainer}>
          <View style={headerstyle.modalContent}>
            <Text style={headerstyle.modalTitle}>Thông báo</Text>
            {notifications.length > 0 ? (
              <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={headerstyle.notificationItemContainer}>
                    <Icon
                      name="bell"
                      size={20}
                      color="#8B4513"
                      style={headerstyle.notificationIcon}
                    />
                    <Text style={headerstyle.notificationItem}>{item.message}</Text>
                  </View>
                )}
              />
            ) : (
              <Text style={headerstyle.noNotificationsText}>Không có thông báo</Text>
            )}
            <Pressable
              onPress={() => setIsNotificationVisible(false)}
              style={headerstyle.closeButton}
            >
              <Text style={headerstyle.closeButtonText}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={headerstyle.leftContainer}>
        <Profile />
        <View style={headerstyle.textContainer}>
          <Text style={headerstyle.nameText}>Mian Da Da</Text>
          <Text style={headerstyle.descriptionText}>
            Cô gái trà sữa trẻ tuổi mới bắt đầu
          </Text>
        </View>
      </View>

      <View style={headerstyle.rightContainer}>
        <Pressable
          onPress={handleSearchPress}
          style={({ pressed }) => [
            headerstyle.icon,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Icon name="search" size={24} color="#000" />
        </Pressable>

        <Pressable
          onPress={handleNotificationPress}
          style={({ pressed }) => [
            headerstyle.notificationContainer,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Icon name="bell" size={24} color="#000" />
          {showBadge && hasUnreadNotifications && <View style={headerstyle.badge} />}
        </Pressable>
      </View>
    </View>
  );
};

export const headerstyle = StyleSheet.create({
  headerView: {
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionText: {
    color: "#8C8E98",
    fontSize: 10,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  icon: {
    marginRight: 15,
  },
  notificationContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#FF6347",
    borderRadius: 10,
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    maxHeight: "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  notificationItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fafafa",
    borderRadius: 8,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  notificationIcon: {
    marginRight: 10,
  },
  notificationItem: {
    fontSize: 16,
    color: "#444",
    flex: 1,
  },
  noNotificationsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontStyle: "italic",
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#8B4513",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Header;