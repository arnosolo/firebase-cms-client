<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n';
import i18n from "../locale/i18n";
import { regionConfig } from "../locale/regionConfig";
import { useFiles } from '../hooks/useFiles';
import FilePicker from '../components/FilePicker.vue'
import Article from '../components/Article.vue'
import TopArticle from '../components/TopArticle.vue'
import DragToUpload from '../components/DragToUpload/index.vue'
import { ArticleOption } from "../types/ArticleOption";
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  Timestamp,
  deleteDoc,
where,
} from 'firebase/firestore';
import {
  getStorage,
  ref as firebaseStoreRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getPerformance } from 'firebase/performance';
import { getFirebaseConfig } from "../firebase-config";
import img_profile_placeholder from '../assets/profile_placeholder.png'

interface Message {
  id: string
  name: string
  text: string
  profilePicUrl: string
  imageUrl: string
  storageUri: string
  timestamp: Timestamp
}

interface Product {
  id: string,
  name: string,
  description: string,
  main_image: string,
  categories: Array<string>,
  imageUrl: string,
}

interface Category {
  id: string;
  name: string;
  coverImg: string;
  imageUrl: string;
  products: string[];
}


// Main
var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';
const { t } = useI18n();

const activeCategory = ref('')
const userName = ref('');
const profilePicUrl = ref('');
const messageInput = ref('')
const messageList = reactive<Array<Message>>([])
const productList = reactive<Array<Product>>([])
function setProductList(newList: Array<Product>) {
  productList.length = 0
  newList.forEach((product) => {
    productList.push(product)
  })
}
const categoryList = reactive<Array<Category>>([])
function setMessageList(messages: Array<Message>) {
  messageList.length = 0
}
const { files, setFiles } = useFiles()

const firebaseAppConfig = getFirebaseConfig()
initializeApp(firebaseAppConfig)
initFirebaseAuth()
loadMessages()
loadProducts()
loadCategories()

async function signIn() {
  let provider = new GoogleAuthProvider()
  await signInWithPopup(getAuth(), provider)
}

function signOutUser() {
  signOut(getAuth())
}

function initFirebaseAuth() {
  onAuthStateChanged(getAuth(), authStateObserver)
}

function getProfilePicUrl() {
  return getAuth().currentUser?.photoURL || img_profile_placeholder;
}

function getUserName() {
  return getAuth().currentUser?.displayName || 'Default Name';
}

function isUserSignedIn() {
  return getAuth().currentUser ? true : false;
}

async function saveMessage(messageText: string) {
  try {
    await addDoc(collection(getFirestore(), 'messages'), {
      name: getUserName(),
      text: messageText,
      profilePicUrl: getProfilePicUrl(),
      timestamp: serverTimestamp(),
    })
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
  }
}

function loadMessages() {
  const recentMessagesQuery = query(
    collection(getFirestore(), 'messages'),
    orderBy('timestamp', 'desc'),
    limit(12),
  );

  onSnapshot(recentMessagesQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'removed') {
        deleteMessage(change.doc.id)
      } else {
        const { storageUri, timestamp, name, text, profilePicUrl, imageUrl } = change.doc.data();
        displayMessage(
          {
            id: change.doc.id,
            timestamp,
            name,
            text,
            profilePicUrl,
            imageUrl,
            storageUri,
          }
        )
      }
    })
  })
}

function deleteMessage(id: string) {
  const itemId = messageList.findIndex(msg => msg.id === id)
  if (itemId > -1) {
    messageList.splice(itemId, 1)
  }
}

async function deleteMessageInCloud(message: Message) {
  try {
    console.log('Deleting message:', message.id);
    await deleteDoc(doc(getFirestore(), 'messages', message.id))
    console.log('Message deleted:', message.id);
    if (message.storageUri) {
      console.log('Deleting file:', message.storageUri);
      const imageRef = firebaseStoreRef(getStorage(), message.storageUri)
      await deleteObject(imageRef)
      console.log('File deleted:', message.storageUri);
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadProductsByCategory(category: string) {
  productList.length = 0
  const recentProductsQuery = query(
    collection(getFirestore(), 'products'),
    where('categories', 'array-contains', category),
    // where('name', '==', 'iPhone11'),
    orderBy('name', 'desc'),
    limit(12),
  );

  const querySnapshot = await getDocs(recentProductsQuery)
  const products = new Array<Product>()
  querySnapshot.forEach((doc) => {
    const { description, name, main_image, categories } = doc.data()
    products.push({
            id: doc.id,
            name,
            description,
            main_image,
            categories,
            imageUrl: '',
          })
  })

  const promises = products.map(async (product) => {
    const filePath = product.main_image
    const newImageRef = firebaseStoreRef(getStorage(), filePath)
    product.imageUrl = await getDownloadURL(newImageRef)
  })

  await Promise.all(promises)
  console.log(products);
  
  setProductList(products)
}

async function loadProducts() {
  const recentProductsQuery = query(
    collection(getFirestore(), 'products'),
    // where('categories', 'array-contains', 'furniture'),
    // where('name', '==', 'iPhone11'),
    orderBy('name', 'desc'),
    limit(12),
  );

  const querySnapshot = await getDocs(recentProductsQuery)
  querySnapshot.forEach((doc) => {
    const { description, name, main_image, categories } = doc.data()
    displayProduct({
            id: doc.id,
            name,
            description,
            main_image,
            categories,
            imageUrl: ''
          })
  })

  // onSnapshot(recentProductsQuery, (snapshot) => {
  //   snapshot.docChanges().forEach((change) => {
  //     if (change.type === 'removed') {
  //       deleteProduct(change.doc.id)
  //     } else {
  //       const { description, name, main_image, categories } = change.doc.data();
  //       displayProduct(
  //         {
  //           id: change.doc.id,
  //           name,
  //           description,
  //           main_image,
  //           categories,
  //           imageUrl: ''
  //         }
  //       )
  //     }
  //   })
  // })
}

function deleteProduct(id: string) {
}

async function displayProduct(product: Product) {
  if(product.name) {
    const filePath = product.main_image
    const newImageRef = firebaseStoreRef(getStorage(), filePath)
    product.imageUrl = await getDownloadURL(newImageRef)
    productList.push(product)
  }
}

async function loadCategories() {
  const recentCategoriesQuery = query(
    collection(getFirestore(), 'categories'),
    orderBy('name', 'desc'),
    limit(12),
  );

  const querySnapshot = await getDocs(recentCategoriesQuery)
  querySnapshot.forEach((doc) => {
    const { name, coverImg, products } = doc.data();
    displayCategory(
      {
        id: doc.id,
        name,
        coverImg,
        imageUrl: '',
        products,
      }
    )
  })
}

function deleteCategory(id: string) {
}

async function displayCategory(category: Category) {
  if(category.name) {
    try {
      const filePath = category.coverImg
      console.log(filePath);
      const newImageRef = firebaseStoreRef(getStorage(), filePath)
      category.imageUrl = await getDownloadURL(newImageRef)
      categoryList.push(category)
    } catch (error) {
      console.error(error)
    }
  }
}

function displayMessage(message: Message) {
  if (message.timestamp) {
    // const duplicateItemId = messageList.findIndex(msg => msg.id === message.id)
    // if (duplicateItemId > -1) {
    //   messageList.splice(duplicateItemId, 1)
    // }
    messageList.push(message)
    messageList.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
  }
}

async function saveImageMessage(file: File) {
  try {
    // 1 - We add a message with a loading icon that will get updated with the shared image.
    const messageRef = await addDoc(
      collection(getFirestore(), 'messages'),
      {
        name: getUserName(),
        imageUrl: LOADING_IMAGE_URL,
        profilePicUrl: getProfilePicUrl(),
        timestamp: serverTimestamp(),
      }
    )

    // 2 - Upload the image to Cloud Storage.
    const filePath = `${getAuth().currentUser?.uid}/${messageRef.id}/${file.name}`
    const newImageRef = firebaseStoreRef(getStorage(), filePath)
    const fileSnapshot = await uploadBytesResumable(newImageRef, file)

    // 3 - Generate a public URL for the file.
    const publicImageUrl = await getDownloadURL(newImageRef)

    // 4 - Update the chat message placeholder with the image's URL.
    await updateDoc(messageRef, {
      imageUrl: publicImageUrl,
      storageUri: fileSnapshot.metadata.fullPath
    })
  } catch (error) {
    console.error('There was an error uploading a file to Cloud Storage:', error);
  }
}

function authStateObserver(user: any) {
  profilePicUrl.value = getProfilePicUrl();
  userName.value = getUserName();
  if (user) {
  } else {
  }
}

function handleMessageSendBtnClick() {
  if (messageInput.value.length > 0) {
    saveMessage(messageInput.value)
    messageInput.value = ''
  }
}

function handleFileChange(newFiles: Array<File>) {
  setFiles(newFiles)
  if (files[0]) {
    saveImageMessage(files[0])
  }
}

function handleDeleteBtnClick(message: Message) {
  deleteMessageInCloud(message)
}

function handleCategoryClick(categoryName: string) {
  activeCategory.value = categoryName
  loadProductsByCategory(categoryName)
}

</script>

<template>
  <div class="flex justify-center gap-2 py-2 md:gap-10">
    <div class="flex flex-col flex-wrap gap-4 justify-center items-center
      w-full max-w-2xl">
      <!-- <Article v-for="article of articles" :articleOption="article" /> -->

      <!-- Login -->
      <!-- <div class="flex items-center gap-2">
        <img :src="profilePicUrl" class="w-10 rounded-full" alt="profile Pic">
        <p>{{ userName }}</p>
        <button v-if="isUserSignedIn()"
          @click="signOutUser"
          class="btn-primary"
        >
          Sign out
        </button>
        <button v-else
          @click="signIn"
          class="btn-primary"
        >
          Sign in
        </button>
      </div> -->

      <!-- <div class="flex items-center">
        <div class="flex items-center gap-1">
          <input v-model="messageInput" type="text" class="bg-bright-bg dark:bg-dark-bg w-24 border-b outline-0">
          <button @click="handleMessageSendBtnClick" class="btn-primary">Send</button>
        </div>
        <FilePicker text="Upload" @file-change="handleFileChange" />
      </div>

      <ul class="flex flex-col gap-2">
        <li v-for="(msg, i) in messageList" :key="msg.id" class="flex gap-2">
          <img v-if="msg.imageUrl" :src="msg.imageUrl" class="w-12" alt="msg img">
          <p v-if="msg.text">{{ msg.text }}</p>
          <button @click="handleDeleteBtnClick(msg)">delete</button>
        </li>
      </ul> -->

      <!-- Category List -->
      <h3 class="font-bold text-lg">Categories</h3>
      <div>
        <ul class="flex gap-2">
          <li
            v-for="category in categoryList"
            :key="category.id"
            class="flex gap-1 rounded-md p-2 border-bright"
            :class="{
              'border': activeCategory === category.name
            }"
            @click="handleCategoryClick(category.name)"
          >
            <img
              v-if="category.coverImg"
              :src="category.imageUrl"
              class="w-12"
              alt="msg img">
            <div class="flex flex-col">
              <p>
                {{ category.name }}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Product List -->
      <!-- <h3 class="font-bold text-lg">Products</h3> -->
      <p v-show="productList.length === 0">Loading...</p>
      <ul class="flex flex-col gap-2">
        <li v-for="product in productList"
          :key="product.id"
          class="flex gap-2"
        >
          <img v-if="product.main_image" 
            :src="product.imageUrl" class="w-12" alt="msg img">
          <div>
            <p>{{ product.name }}</p>
            <ul class="flex gap-1">
              <li v-for="(category, i) in product.categories"
                :key="i"
                class="flex gap-2"
              >
                <p class="border rounded-lg px-1">{{ category }}</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>

    </div>
    <div class="hidden sm:flex flex-col gap-3">
      <p>AD</p>
      <p>AD</p>
      <p>AD</p>
    </div>
  </div>
</template>

<style scoped>
</style>
