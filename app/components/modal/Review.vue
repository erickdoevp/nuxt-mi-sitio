<script setup lang="ts">

import type { User } from '#auth-utils';
import type { ProductReview } from '@prisma/client';

const props = defineProps<{
  buttonLabel: string;
  slug: string;
  user: User | null;
}>();

const emit = defineEmits<{
  (event: 'review-posted', review: ProductReview): void,
}>();

const toast = useToast();

const reviewText = ref('');
const rating = ref(0);
const isOpen = ref(false);

const userTitle = ref('');

const submitReview = async () => {
  try {
    const review = await $fetch<ProductReview>(`/api/product/${ props.slug }/reviews`, {
      method: 'POST',
      body: {
        rating: rating.value,
        review: reviewText.value,
        userTitle: reviewText.value,
      }
    });

    emit('review-posted', review);
    toast.add({
      title: 'Reseña enviada',
      description: 'Tu reseña ha sido enviada correctamente.'
    });

  } catch (error) {
    toast.add({
      title: 'Error al enviar la reseña',
      description: error instanceof Error ? error.message : 'Unknown error',
      color: 'error'
    });
  }
  isOpen.value = false;
};

const handleCloseModal = (event: boolean) => {
  isOpen.value = event;
  reviewText.value = '';
  rating.value = 0;
  userTitle.value = '';
}

</script>

<template>
  <UModal
    :open="isOpen"
    @close="isOpen = false"
    title="Añadir reseña"
    description="Deja tu reseña sobre el producto."
    @update:open="isOpen = $event"
  >
    <UButton
      :label="buttonLabel"
      color="primary"
      variant="subtle"
      @click="handleCloseModal(true)"
    />

    <template #content>
      <UContainer class="max-w-2xl mx-auto p-4">
        <h2 class="text-xl font-semibold">Añadir reseña</h2>
        <p class="text-gray-600 text-sm mb-5">
          Deja tu reseña sobre el producto.
        </p>
        <form class="grid grid-cols-1 gap-4 mb-5">
          <input type="hidden" v-model="rating" />

          <!-- Stars -->
          <div class="col-span-1">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-star"
                class="text-gray-600 text-xl cursor-pointer"
                :class="{ 'text-yellow-500': rating >= star }"
                v-for="star in 5"
                :key="star"
                @click="rating = star"
              />
            </div>
          </div>

          <div class="col-span-1">
            <UInput
              :model-value="user?.name"
              class="w-full"
              disabled
            />
          </div>

          <div class="col-span-1">
            <UInput
              v-model="userTitle"
              class="w-full"
              placeholder="Título del usuario"
            />
          </div>

          <div class="col-span-1">
            <UTextarea
              v-model="reviewText"
              placeholder="Escribe tu reseña"
              class="w-full"
              :rows="6"
            />
          </div>

          <div class="flex flex-1 items-end">
            <UButton
              color="primary"
              variant="solid"
              block
              label="Enviar reseña"
              :disabled="!reviewText || rating === 0"
              @click="submitReview"
            />
          </div>
        </form>
      </UContainer>
    </template>
  </UModal>
</template>
