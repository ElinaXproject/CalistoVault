# Android ProGuard rules for Calisto Vault
# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   https://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Retrofit
-keepattributes Signature
-keepattributes Exceptions
-keepclasseswithmembers class * {
    @retrofit2.* <methods>;
}

# Room Database
-keep class androidx.room.** { *; }
-keep class * extends androidx.room.Database { *; }
-keep class * extends androidx.room.Entity { *; }
-keep class * extends androidx.room.Dao { *; }

# Kotlin
-keep class kotlin.Metadata { *; }
-keep class kotlin.** { *; }

# Compose
-keep class androidx.compose.runtime.** { *; }
-keep class androidx.compose.ui.** { *; }

# OkHttp
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**

# GSON
-keep class com.google.gson.** { *; }
-keep class * implements com.google.gson.TypeAdapterFactory
-keep class * implements com.google.gson.JsonSerializer
-keep class * implements com.google.gson.JsonDeserializer

# Coroutines
-keep class kotlinx.coroutines.** { *; }
